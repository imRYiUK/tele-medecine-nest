import {
  Controller, Get,
  Param, UseGuards, Res,
  Query, HttpStatus, Header,
  Post, Body, UploadedFile,
  UseInterceptors, HttpException, Req, UnauthorizedException
} from '@nestjs/common';
import { FindDicomDto } from './dto/find-dicom.dto';
import { UploadDicomDto } from './dto/upload-dicom.dto';
import { OrthancService } from './orthanc.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { UserRole } from '../common/constants/roles';
import { Request } from 'express';
import { LogActivity } from '../common/decorators/log-activity.decorator';

@Controller('dicom')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('DICOM')
export class OrthancController {
  constructor(private readonly orthancService: OrthancService) {}

  private getUserId(req: Request): string {
    if (!req.user || !req.user['utilisateurID']) {
      throw new UnauthorizedException('Utilisateur non authentifié');
    }
    return req.user['utilisateurID'];
  }

  @Get('studies')
  @Roles(UserRole.RADIOLOGUE, UserRole.MEDECIN)
  @ApiOperation({ summary: 'Récupérer toutes les études DICOM' })
  @ApiResponse({ status: 200, description: 'Liste des études récupérée avec succès' })
  @ApiResponse({ status: 500, description: 'Erreur serveur' })
  async getStudies(@Req() req: Request) {
    try {
      const userId = this.getUserId(req);
      const studies = await this.orthancService.getStudies(userId);
      return { success: true, data: studies };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la récupération des études',
        error: error.message,
      };
    }
  }

  @Get('studies/:id')
  @Roles(UserRole.RADIOLOGUE, UserRole.MEDECIN)
  @ApiOperation({ summary: 'Récupérer les détails d\'une étude DICOM' })
  @ApiResponse({ status: 200, description: 'Détails de l\'étude récupérés avec succès' })
  async getStudyDetails(@Param('id') studyId: string, @Req() req: Request) {
    try {
      const userId = this.getUserId(req);
      const study = await this.orthancService.getStudyDetails(studyId, userId);
      return { success: true, data: study };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la récupération des détails de l\'étude',
        error: error.message,
      };
    }
  }

  @Get('studies/:id/series')
  @Roles(UserRole.RADIOLOGUE, UserRole.MEDECIN)
  @ApiOperation({ summary: 'Récupérer les séries d\'une étude DICOM' })
  @ApiResponse({ status: 200, description: 'Liste des séries récupérée avec succès' })
  async getSeries(@Param('id') studyId: string, @Req() req: Request) {
    try {
      const userId = this.getUserId(req);
      const series = await this.orthancService.getSeries(studyId, userId);
      return { success: true, data: series };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la récupération des séries',
        error: error.message,
      };
    }
  }

  @Get('series/:id')
  @Roles(UserRole.RADIOLOGUE, UserRole.MEDECIN)
  @ApiOperation({ summary: 'Récupérer les détails d\'une série DICOM' })
  @ApiResponse({ status: 200, description: 'Détails de la série récupérés avec succès' })
  async getSeriesDetails(@Param('id') seriesId: string, @Req() req: Request) {
    try {
      const userId = this.getUserId(req);
      const series = await this.orthancService.getSeriesDetails(seriesId, userId);
      return { success: true, data: series };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la récupération des détails de la série',
        error: error.message,
      };
    }
  }

  @Get('series/:id/instances')
  @Roles(UserRole.RADIOLOGUE, UserRole.MEDECIN)
  @ApiOperation({ summary: 'Récupérer les instances d\'une série DICOM' })
  @ApiResponse({ status: 200, description: 'Liste des instances récupérée avec succès' })
  async getInstances(@Param('id') seriesId: string, @Req() req: Request) {
    try {
      const userId = this.getUserId(req);
      const instances = await this.orthancService.getInstances(seriesId, userId);
      return { success: true, data: instances };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la récupération des instances',
        error: error.message,
      };
    }
  }

  @Get('instances/:id')
  @Roles(UserRole.RADIOLOGUE, UserRole.MEDECIN)
  @ApiOperation({ summary: 'Récupérer les détails d\'une instance DICOM' })
  @ApiResponse({ status: 200, description: 'Détails de l\'instance récupérés avec succès' })
  async getInstanceDetails(@Param('id') instanceId: string, @Req() req: Request) {
    try {
      const userId = this.getUserId(req);
      const instance = await this.orthancService.getInstanceDetails(instanceId, userId);
      return { success: true, data: instance };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la récupération des détails de l\'instance',
        error: error.message,
      };
    }
  }

  @Get('instances/:id/file')
  @Roles(UserRole.RADIOLOGUE, UserRole.MEDECIN)
  @ApiOperation({ summary: 'Télécharger un fichier DICOM' })
  @ApiResponse({ status: 200, description: 'Fichier DICOM téléchargé avec succès' })
  async getDicomFile(@Param('id') instanceId: string, @Res() res: Response, @Req() req: Request) {
    try {
      const userId = this.getUserId(req);
      const stream = await this.orthancService.getDicomFile(instanceId, userId);
      stream.pipe(res);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors du téléchargement du fichier DICOM',
        error: error.message,
      });
    }
  }

  @Get('instances/:id/preview')
  @Roles(UserRole.RADIOLOGUE, UserRole.MEDECIN)
  @ApiOperation({ summary: 'Récupérer l\'aperçu d\'une instance DICOM' })
  @ApiResponse({ status: 200, description: 'Aperçu de l\'instance récupéré avec succès' })
  async getInstancePreview(
    @Param('id') instanceId: string,
    @Query('quality') quality: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const userId = this.getUserId(req);
      const qualityValue = quality ? parseInt(quality, 10) : 90;
      const imageData = await this.orthancService.getInstancePreview(instanceId, userId, qualityValue);
      res.end(imageData);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération de l\'aperçu',
        error: error.message,
      });
    }
  }

  @Get('save-metadata')
  @Roles('RADIOLOGUE', 'MEDECIN')
  @ApiOperation({ summary: 'Sauvegarder les métadonnées d\'une image DICOM' })
  @ApiResponse({ status: 200, description: 'Métadonnées sauvegardées avec succès' })
  @ApiResponse({ status: 500, description: 'Erreur serveur' })
  async saveImageMetadata(
    @Query('examenId') examenId: string,
    @Query('orthancId') orthancId: string,
    @Query('studyUid') studyUid: string,
    @Query('modalite') modalite: string,
  ) {
    try {
      const result = await this.orthancService.saveImageMetadata(
        examenId,
        orthancId,
        studyUid,
        modalite,
      );
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        message: 'Erreur lors de la sauvegarde des métadonnées',
        error: error.message,
      };
    }
  }

  @Post('upload')
  @Roles('RADIOLOGUE', 'MEDECIN')
  @LogActivity({
    typeAction: 'UPLOAD_DICOM',
    description: 'Téléchargement d\'un fichier DICOM',
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Uploader un fichier DICOM (C-STORE)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadDicomDto })
  @ApiResponse({ status: 201, description: 'Fichier DICOM uploadé avec succès' })
  @ApiResponse({ status: 400, description: 'Fichier DICOM invalide' })
  @ApiResponse({ status: 500, description: 'Erreur serveur' })
  async uploadDicomFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    try {
      if (!file) {
        throw new HttpException('Aucun fichier fourni', HttpStatus.BAD_REQUEST);
      }
      
      const userId = this.getUserId(req);
      const result = await this.orthancService.uploadDicomFile(file.buffer, userId);
      return { success: true, data: result };
    } catch (error) {
      // Transmettre le code d'erreur d'Orthanc si disponible
      const statusCode = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException({
        success: false,
        message: 'Erreur lors de l\'upload du fichier DICOM',
        error: error.message,
        orthancError: error.response?.data,
      }, statusCode);
    }
  }

  @Post('find')
  @Roles('RADIOLOGUE', 'MEDECIN')
  @ApiOperation({ summary: 'Rechercher des études DICOM (C-FIND)' })
  @ApiResponse({ status: 200, description: 'Résultats de recherche' })
  @ApiResponse({ status: 400, description: 'Requête invalide' })
  @ApiResponse({ status: 500, description: 'Erreur serveur' })
  async findDicom(@Body() findRequest: FindDicomDto, @Req() req: Request) {
    try {
      const userId = this.getUserId(req);
      const results = await this.orthancService.findDicom(findRequest.Level, findRequest.Query, userId);
      return { success: true, data: results };
    } catch (error) {
      const statusCode = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException({
        success: false,
        message: 'Erreur lors de la recherche DICOM',
        error: error.message,
        orthancError: error.response?.data,
      }, statusCode);
    }
  }

  @Get('wado/:id')
  @Roles('RADIOLOGUE', 'MEDECIN')
  @ApiOperation({ summary: 'Récupérer une image DICOM via WADO-GET' })
  @ApiResponse({ status: 200, description: 'Image récupérée avec succès' })
  @ApiResponse({ status: 404, description: 'Image non trouvée' })
  @ApiResponse({ status: 500, description: 'Erreur serveur' })
  async getWadoImage(
    @Param('id') instanceId: string,
    @Query('contentType') contentType: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const userId = this.getUserId(req);
      const { data, headers } = await this.orthancService.getWadoImage(instanceId, contentType, userId);
      
      // Définir les en-têtes de réponse
      Object.keys(headers).forEach(key => {
        res.setHeader(key, headers[key]);
      });
      
      // Envoyer les données
      res.end(data);
    } catch (error) {
      const statusCode = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      res.status(statusCode).json({
        success: false,
        message: 'Erreur lors de la récupération de l\'image WADO',
        error: error.message,
        orthancError: error.response?.data,
      });
    }
  }
}
