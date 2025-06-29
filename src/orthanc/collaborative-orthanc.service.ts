import { Injectable, Logger, NotFoundException, ForbiddenException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CollaborativeOrthancService {
  private readonly logger = new Logger(CollaborativeOrthancService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Get DICOM image preview for collaborative access
   * This method checks if the user has collaboration access to the image
   * and uses the inviter's Orthanc configuration to serve the image
   */
  async getCollaborativeImagePreview(
    sopInstanceUID: string,
    userId: string,
    quality: number = 90
  ): Promise<Buffer> {
    this.logger.log(`Collaborative preview request - sopInstanceUID: ${sopInstanceUID}, userId: ${userId}`);

    // First, find the image by SOP Instance UID
    const image = await this.prisma.imageMedicale.findFirst({
      where: { sopInstanceUID },
      include: {
        collaborations: {
          where: {
            OR: [
              { inviterID: userId },
              { inviteeID: userId }
            ],
            status: 'ACCEPTED'
          },
          include: {
            inviter: true,
            invitee: true
          }
        },
        examen: {
          include: {
            demandePar: true,
            radiologues: true
          }
        }
      }
    });

    if (!image) {
      throw new NotFoundException(`Image with SOP Instance UID ${sopInstanceUID} not found`);
    }

    // Check if user has access to this image
    const hasAccess = await this.checkUserAccessToImage(image, userId);
    if (!hasAccess) {
      throw new ForbiddenException('You do not have access to this image');
    }


    console.log('image2', image);
    // Get the Orthanc configuration for the image owner (inviter)
    const orthancConfig = await this.getOrthancConfigForImageOwner(image, userId);

    console.log('orthancConfig', orthancConfig);
    // Get the preview from the owner's Orthanc server
    if (!image.sopInstanceUID) {
      throw new NotFoundException('Orthanc instance ID not found for this image');
    }

    const previewData = await this.getImagePreviewFromOrthanc(
      image.sopInstanceUID,
      orthancConfig,
      quality
    );

    this.logger.log(`Collaborative preview served successfully for user ${userId}`);
    return previewData;
  }

  /**
   * Get DICOM file for collaborative access
   */
  async getCollaborativeDicomFile(
    sopInstanceUID: string,
    userId: string
  ): Promise<Buffer> {
    this.logger.log(`Collaborative file request - sopInstanceUID: ${sopInstanceUID}, userId: ${userId}`);

    // First, find the image by SOP Instance UID
    const image = await this.prisma.imageMedicale.findFirst({
      where: { sopInstanceUID },
      include: {
        collaborations: {
          where: {
            OR: [
              { inviterID: userId },
              { inviteeID: userId }
            ],
            status: 'ACCEPTED'
          },
          include: {
            inviter: true,
            invitee: true
          }
        },
        examen: {
          include: {
            demandePar: true,
            radiologues: true
          }
        }
      }
    });

    if (!image) {
      throw new NotFoundException(`Image with SOP Instance UID ${sopInstanceUID} not found`);
    }

    // Check if user has access to this image
    const hasAccess = await this.checkUserAccessToImage(image, userId);
    if (!hasAccess) {
      throw new ForbiddenException('You do not have access to this image');
    }

    console.log('image1', image);
    // Get the Orthanc configuration for the image owner (inviter)
    const orthancConfig = await this.getOrthancConfigForImageOwner(image, userId);
    
    // Get the file from the owner's Orthanc server
    if (!image.sopInstanceUID) {
      throw new NotFoundException('Orthanc instance ID not found for this image');
    }

    const fileData = await this.getDicomFileFromOrthanc(
      image.sopInstanceUID,
      orthancConfig
    );

    this.logger.log(`Collaborative file served successfully for user ${userId}`);
    return fileData;
  }

  /**
   * Check if user has access to the image through collaboration or ownership
   */
  private async checkUserAccessToImage(image: any, userId: string): Promise<boolean> {
    // Check if user is the exam requester
    if (image.examen.demandeParID === userId) {
      return true;
    }

    // Check if user is an assigned radiologist
    const isAssignedRadiologist = image.examen.radiologues.some(
      (r: any) => r.utilisateurID === userId
    );
    if (isAssignedRadiologist) {
      return true;
    }

    // Check if user has an accepted collaboration
    const hasCollaboration = image.collaborations.some(
      (c: any) => c.status === 'ACCEPTED' && (c.inviterID === userId || c.inviteeID === userId)
    );
    if (hasCollaboration) {
      return true;
    }

    return false;
  }

  /**
   * Get Orthanc configuration for the image owner
   * If the user is a collaborator, use the inviter's Orthanc config
   * If the user is the owner, use their own config
   */
  private async getOrthancConfigForImageOwner(image: any, userId: string): Promise<any> {
    // If user is the exam requester or assigned radiologist, use their own config
    if (image.examen.demandeParID === userId) {
      return await this.getOrthancConfigForUser(userId);
    }

    const isAssignedRadiologist = image.examen.radiologues.some(
      (r: any) => r.utilisateurID === userId
    );
    if (isAssignedRadiologist) {
      return await this.getOrthancConfigForUser(userId);
    }

    // If user is a collaborator, find the collaboration and use the inviter's config
    const collaboration = image.collaborations.find(
      (c: any) => c.status === 'ACCEPTED' && (c.inviterID === userId || c.inviteeID === userId)
    );

    if (collaboration) {
      // Use the inviter's Orthanc configuration
      const inviterId = collaboration.inviterID === userId ? collaboration.inviterID : collaboration.inviterID;
      return await this.getOrthancConfigForUser(inviterId);
    }

    throw new ForbiddenException('Unable to determine image owner configuration');
  }

  /**
   * Get Orthanc configuration for a specific user
   */
  private async getOrthancConfigForUser(userId: string): Promise<any> {
    const user = await this.prisma.utilisateur.findUnique({
      where: { utilisateurID: userId },
      include: {
        etablissement: true
      }
    });

    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }

    // Get Orthanc configuration from user's establishment or use defaults
    const orthancUrl = user.etablissement?.orthancUrl || this.configService.get('ORTHANC_URL') || 'http://localhost:8042';
    const orthancUsername = user.etablissement?.orthancLogin || this.configService.get('ORTHANC_USERNAME') || 'orthanc';
    const orthancPassword = user.etablissement?.orthancPassword || this.configService.get('ORTHANC_PASSWORD') || 'orthanc';

    return {
      url: orthancUrl,
      login: orthancUsername,
      password: orthancPassword
    };
  }

  /**
   * Get image preview from Orthanc server
   */
  private async getImagePreviewFromOrthanc(
    orthancInstanceId: string,
    orthancConfig: any,
    quality: number
  ): Promise<Buffer> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${orthancConfig.url}/instances/${orthancInstanceId}/preview`, {
          params: { quality },
          headers: this.getAuthHeaders(orthancConfig.login, orthancConfig.password),
          responseType: 'arraybuffer',
        })
      );
      return Buffer.from(response.data);
    } catch (error) {
      this.logger.error(`Error getting preview from Orthanc: ${error.message}`);
      throw new Error(`Failed to get image preview: ${error.message}`);
    }
  }

  /**
   * Get DICOM file from Orthanc server
   */
  private async getDicomFileFromOrthanc(
    orthancInstanceId: string,
    orthancConfig: any
  ): Promise<Buffer> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${orthancConfig.url}/instances/${orthancInstanceId}/file`, {
          headers: this.getAuthHeaders(orthancConfig.login, orthancConfig.password),
          responseType: 'arraybuffer',
        })
      );
      return Buffer.from(response.data);
    } catch (error) {
      this.logger.error(`Error getting DICOM file from Orthanc: ${error.message}`);
      throw new Error(`Failed to get DICOM file: ${error.message}`);
    }
  }

  /**
   * Get authentication headers for Orthanc
   */
  private getAuthHeaders(username: string, password: string): Record<string, string> {
    const auth = Buffer.from(`${username}:${password}`).toString('base64');
    return {
      'Authorization': `Basic ${auth}`,
    };
  }
} 