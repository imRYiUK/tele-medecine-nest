import {
  Controller, Get, Param, UseGuards, Res,
  Query, HttpStatus, Header, Req, UnauthorizedException
} from '@nestjs/common';
import { Response } from 'express';
import { Request } from 'express';
import { CollaborativeOrthancService } from './collaborative-orthanc.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { UserRole } from '../common/constants/roles';

@Controller('dicom/collaborative')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Collaborative DICOM')
export class CollaborativeOrthancController {
  constructor(private readonly collaborativeOrthancService: CollaborativeOrthancService) {}

  private getUserId(req: Request): string {
    const user = (req as any).user;
    if (!user || !user.utilisateurID) {
      throw new UnauthorizedException('User not authenticated');
    }
    return user.utilisateurID;
  }

  @Get('instances/:sopInstanceUID/preview')
  @Roles(UserRole.RADIOLOGUE, UserRole.MEDECIN)
  @ApiOperation({ summary: 'Récupérer l\'aperçu d\'une image DICOM en mode collaboratif' })
  @ApiResponse({ status: 200, description: 'Aperçu de l\'image récupéré avec succès' })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @ApiResponse({ status: 404, description: 'Image non trouvée' })
  async getCollaborativeImagePreview(
    @Param('sopInstanceUID') sopInstanceUID: string,
    @Query('quality') quality: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const userId = this.getUserId(req);
      const qualityValue = quality ? parseInt(quality, 10) : 90;
      
      const imageData = await this.collaborativeOrthancService.getCollaborativeImagePreview(
        sopInstanceUID,
        userId,
        qualityValue
      );
      
      res.setHeader('Content-Type', 'image/jpeg');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      res.end(imageData);
    } catch (error) {
      const statusCode = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      res.status(statusCode).json({
        success: false,
        message: 'Erreur lors de la récupération de l\'aperçu collaboratif',
        error: error.message,
      });
    }
  }

  @Get('instances/:sopInstanceUID/file')
  @Roles(UserRole.RADIOLOGUE, UserRole.MEDECIN)
  @ApiOperation({ summary: 'Télécharger un fichier DICOM en mode collaboratif' })
  @ApiResponse({ status: 200, description: 'Fichier DICOM téléchargé avec succès' })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @ApiResponse({ status: 404, description: 'Image non trouvée' })
  async getCollaborativeDicomFile(
    @Param('sopInstanceUID') sopInstanceUID: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const userId = this.getUserId(req);
      
      const fileData = await this.collaborativeOrthancService.getCollaborativeDicomFile(
        sopInstanceUID,
        userId
      );
      
      res.setHeader('Content-Type', 'application/dicom');
      res.setHeader('Content-Disposition', `attachment; filename="dicom-${sopInstanceUID}.dcm"`);
      res.setHeader('Cache-Control', 'public, max-age=3600');
      res.end(fileData);
    } catch (error) {
      const statusCode = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      res.status(statusCode).json({
        success: false,
        message: 'Erreur lors du téléchargement du fichier DICOM collaboratif',
        error: error.message,
      });
    }
  }
} 