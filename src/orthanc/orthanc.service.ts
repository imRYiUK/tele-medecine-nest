import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrthancService {
  private readonly orthancUrl: string;
  private readonly orthancUsername: string;
  private readonly orthancPassword: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.orthancUrl = this.configService.get<string>('ORTHANC_URL') || 'http://localhost:8042';
    this.orthancUsername = this.configService.get<string>('ORTHANC_USERNAME') || 'orthanc';
    this.orthancPassword = this.configService.get<string>('ORTHANC_PASSWORD') || 'orthanc';
  }

  /**
   * Récupère la configuration Orthanc (url, login, password) pour l'utilisateur donné.
   * Si l'établissement n'a pas de config, fallback sur la config globale.
   */
  private async getOrthancConfigForUser(userId: string): Promise<{ url: string; login: string; password: string }> {
    try {
      // Récupérer l'utilisateur et son établissement avec les bons champs
      const user = await this.prisma.utilisateur.findUnique({
        where: { utilisateurID: userId },
        select: {
          utilisateurID: true,
          etablissement: {
            select: {
              orthancUrl: true,
              orthancLogin: true,
              orthancPassword: true,
            },
          },
        },
      });

      if (!user) {
        console.warn(`[OrthancService] User ${userId} not found, using global config`);
        return {
          url: this.orthancUrl,
          login: this.orthancUsername,
          password: this.orthancPassword,
        };
      }

      const etab = user.etablissement;
      
      // Debug logging
      console.log(`[OrthancService] User ${userId} establishment config:`, {
        hasEstablishment: !!etab,
        orthancUrl: etab?.orthancUrl,
        orthancLogin: etab?.orthancLogin,
        hasOrthancPassword: !!etab?.orthancPassword,
      });
      
      // Check if establishment has Orthanc configuration
      const hasEstablishmentConfig = etab && (etab.orthancUrl || etab.orthancLogin || etab.orthancPassword);
      
      if (!hasEstablishmentConfig) {
        console.log(`[OrthancService] User ${userId} has no establishment Orthanc config, using global config`);
      }
      
      const url = etab?.orthancUrl || this.orthancUrl;
      const login = etab?.orthancLogin || this.orthancUsername;
      const password = etab?.orthancPassword || this.orthancPassword;
      
      console.log(`[OrthancService] Using Orthanc config:`, {
        url,
        login,
        hasPassword: !!password,
        isUsingEstablishmentConfig: hasEstablishmentConfig,
      });
      
      return { url, login, password };
    } catch (error) {
      console.error(`[OrthancService] Error getting Orthanc config for user ${userId}:`, error);
      // Fallback to global config on error
      return {
        url: this.orthancUrl,
        login: this.orthancUsername,
        password: this.orthancPassword,
      };
    }
  }

  private getAuthHeaders(login: string, password: string) {
    return {
      Authorization: `Basic ${Buffer.from(`${login}:${password}`).toString('base64')}`,
    };
  }

  async getStudies(userId: string) {
    const { url, login, password } = await this.getOrthancConfigForUser(userId);
    // console.log(`whatt [OrthancService] Using Orthanc config:`, {url, login, password});
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${url}/studies`, {
          headers: this.getAuthHeaders(login, password),
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération des études',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getStudyDetails(studyId: string, userId: string) {
    const { url, login, password } = await this.getOrthancConfigForUser(userId);
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${url}/studies/${studyId}`, {
          headers: this.getAuthHeaders(login, password),
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération des détails de l\'étude',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getSeries(studyId: string, userId: string) {
    const { url, login, password } = await this.getOrthancConfigForUser(userId);
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${url}/studies/${studyId}/series`, {
          headers: this.getAuthHeaders(login, password),
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération des séries',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getSeriesDetails(seriesId: string, userId: string) {
    const { url, login, password } = await this.getOrthancConfigForUser(userId);
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${url}/series/${seriesId}`, {
          headers: this.getAuthHeaders(login, password),
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération des détails de la série',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getInstances(seriesId: string, userId: string) {
    const { url, login, password } = await this.getOrthancConfigForUser(userId);
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${url}/series/${seriesId}/instances`, {
          headers: this.getAuthHeaders(login, password),
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération des instances',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getInstanceDetails(instanceId: string, userId: string) {
    const { url, login, password } = await this.getOrthancConfigForUser(userId);
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${url}/instances/${instanceId}`, {
          headers: this.getAuthHeaders(login, password),
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération des détails de l\'instance',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getDicomFile(instanceId: string, userId: string) {
    const { url, login, password } = await this.getOrthancConfigForUser(userId);
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${url}/instances/${instanceId}/file`, {
          headers: this.getAuthHeaders(login, password),
          responseType: 'stream',
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération du fichier DICOM',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getInstancePreview(instanceId: string, userId: string, quality: number = 90) {
    const { url, login, password } = await this.getOrthancConfigForUser(userId);
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${url}/instances/${instanceId}/preview`, {
          headers: this.getAuthHeaders(login, password),
          params: { quality },
          responseType: 'arraybuffer',
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération de l\'aperçu',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async uploadDicomFile(fileBuffer: Buffer, userId: string) {
    const { url, login, password } = await this.getOrthancConfigForUser(userId);
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${url}/instances`, fileBuffer, {
          headers: {
            ...this.getAuthHeaders(login, password),
            'Content-Type': 'application/dicom',
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erreur lors de l\'upload du fichier DICOM',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findDicom(level: string, query: any, userId: string) {
    const { url, login, password } = await this.getOrthancConfigForUser(userId);
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${url}/tools/find`, {
          Level: level,
          Query: query,
        }, {
          headers: this.getAuthHeaders(login, password),
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la recherche DICOM',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getWadoImage(instanceId: string, contentType: string, userId: string): Promise<{ data: Buffer; headers: Record<string, string> }> {
    const { url, login, password } = await this.getOrthancConfigForUser(userId);
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${url}/instances/${instanceId}/wado`, {
          headers: this.getAuthHeaders(login, password),
          params: { contentType },
          responseType: 'arraybuffer',
        })
      );
      return {
        data: response.data,
        headers: Object.fromEntries(Object.entries(response.headers).map(([k, v]) => [k, String(v)])),
      };
    } catch (error) {
      throw new HttpException(
        "Erreur lors de la récupération de l'image WADO",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async saveImageMetadata(examenId: string, orthancId: string, studyUid: string, modalite: string) {
    try {
      const image = await this.prisma.imageMedicale.create({
        data: {
          examenID: examenId,
          studyInstanceUID: studyUid,
          seriesInstanceUID: orthancId,
          sopInstanceUID: orthancId,
          dateAcquisition: new Date(),
          modalite,
          description: `Image DICOM - ${modalite}`,
        },
      });
      return image;
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la sauvegarde des métadonnées',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Fetch DICOM tags for a given instance from Orthanc
   */
  async getDicomTags(instanceId: string, userId: string): Promise<any> {
    const { url, login, password } = await this.getOrthancConfigForUser(userId);
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${url}/instances/${instanceId}/tags?short`, {
          headers: this.getAuthHeaders(login, password),
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération des tags DICOM',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Extract acquisition date (ISO string) from DICOM tags
   */
  extractAcquisitionDate(tags: any): string | null {
    const acq = tags['0008,0022'] || tags['0008,0020'];
    if (!acq) return null;
    return `${acq.slice(0, 4)}-${acq.slice(4, 6)}-${acq.slice(6, 8)}T00:00:00.000Z`;
  }

  /**
   * Extract modality from DICOM tags
   */
  extractModality(tags: any): string | null {
    return tags['0008,0060'] || null;
  }

  /**
   * Get acquisition date and modality for a given instance
   */
  async getInstanceAcquisitionAndModality(instanceId: string, userId: string): Promise<{ acquisitionDate: string | null, modality: string | null }> {
    const tags = await this.getDicomTags(instanceId, userId);
    return {
      acquisitionDate: this.extractAcquisitionDate(tags),
      modality: this.extractModality(tags),
    };
  }
}
