import { Controller, Get, Param, UseGuards, Res, Query, HttpStatus, Header, Post, Body, UploadedFile, UseInterceptors, HttpException } from '@nestjs/common';
import { FindDicomDto } from './dto/find-dicom.dto';
import { UploadDicomDto } from './dto/upload-dicom.dto';
import { OrthancService } from './orthanc.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';

@Controller('dicom')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('DICOM')
export class OrthancController {
  constructor(private readonly orthancService: OrthancService) {}

  @Get('studies')
  @Roles('RADIOLOGUE', 'MEDECIN')
  @ApiOperation({ summary: 'Récupérer toutes les études DICOM' })
  @ApiResponse({ status: 200, description: 'Liste des études récupérée avec succès' })
  @ApiResponse({ status: 500, description: 'Erreur serveur' })
  async getStudies() {
    try {
      const studies = await this.orthancService.getStudies();
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
  @Roles('RADIOLOGUE', 'MEDECIN')
  async getStudyDetails(@Param('id') studyId: string) {
    try {
      const study = await this.orthancService.getStudyDetails(studyId);
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
  @Roles('RADIOLOGUE', 'MEDECIN')
  async getSeries(@Param('id') studyId: string) {
    try {
      const series = await this.orthancService.getSeries(studyId);
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
  @Roles('RADIOLOGUE', 'MEDECIN')
  async getSeriesDetails(@Param('id') seriesId: string) {
    try {
      const series = await this.orthancService.getSeriesDetails(seriesId);
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
  @Roles('RADIOLOGUE', 'MEDECIN')
  async getInstances(@Param('id') seriesId: string) {
    try {
      const instances = await this.orthancService.getInstances(seriesId);
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
  @Roles('RADIOLOGUE', 'MEDECIN')
  async getInstanceDetails(@Param('id') instanceId: string) {
    try {
      const instance = await this.orthancService.getInstanceDetails(instanceId);
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
  @Roles('RADIOLOGUE', 'MEDECIN')
  @Header('Content-Type', 'application/dicom')
  async getDicomFile(@Param('id') instanceId: string, @Res() res: Response) {
    try {
      const stream = await this.orthancService.getDicomFile(instanceId);
      stream.pipe(res);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Erreur lors de la récupération du fichier DICOM',
        error: error.message,
      });
    }
  }

  @Get('instances/:id/preview')
  @Roles('RADIOLOGUE', 'MEDECIN')
  @Header('Content-Type', 'image/jpeg')
  async getInstancePreview(
    @Param('id') instanceId: string,
    @Query('quality') quality: string,
    @Res() res: Response,
  ) {
    try {
      const qualityValue = quality ? parseInt(quality, 10) : 90;
      const imageData = await this.orthancService.getInstancePreview(instanceId, qualityValue);
      res.end(imageData);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Erreur lors de la récupération de l\'aperçu de l\'image',
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
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Uploader un fichier DICOM (C-STORE)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadDicomDto })
  @ApiResponse({ status: 201, description: 'Fichier DICOM uploadé avec succès' })
  @ApiResponse({ status: 400, description: 'Fichier DICOM invalide' })
  @ApiResponse({ status: 500, description: 'Erreur serveur' })
  async uploadDicomFile(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        throw new HttpException('Aucun fichier fourni', HttpStatus.BAD_REQUEST);
      }
      
      const result = await this.orthancService.uploadDicomFile(file.buffer);
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
  async findDicom(@Body() findRequest: FindDicomDto) {
    try {
      const results = await this.orthancService.findDicom(findRequest.Level, findRequest.Query);
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
  ) {
    try {
      const { data, headers } = await this.orthancService.getWadoImage(instanceId, contentType);
      
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
