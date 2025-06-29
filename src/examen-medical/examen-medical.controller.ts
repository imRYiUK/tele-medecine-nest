import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put, Query, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ExamenMedicalService } from './examen-medical.service';
import { 
  CreateExamenMedicalDto, 
  UpdateExamenMedicalDto,
  CreateImageMedicaleDto,
  UpdateImageMedicaleDto,
  ExamenMedicalListDto,
  ImageMedicaleDto
} from './dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Public } from '../common/decorators/public.decorator';
import { UserRole } from '../common/constants/roles';

@Controller('examens-medicaux')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Examens médicaux')
@ApiBearerAuth()
export class ExamenMedicalController {
  private readonly logger = new Logger(ExamenMedicalController.name);

  constructor(private readonly examenMedicalService: ExamenMedicalService) {}

  @Post()
  @Roles(UserRole.MEDECIN, UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Créer un nouvel examen médical' })
  @ApiResponse({ status: 201, description: 'L\'examen médical a été créé avec succès' })
  create(@Body() createExamenMedicalDto: CreateExamenMedicalDto, @Request() req) {
    return this.examenMedicalService.create(createExamenMedicalDto, req.user.utilisateurID);
  }

  @Get('liste-avec-images')
  @Roles(UserRole.MEDECIN, UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Récupérer la liste des examens avec le nombre d\'images' })
  @ApiResponse({ status: 200, description: 'Liste des examens avec compteurs d\'images récupérée avec succès', type: [ExamenMedicalListDto] })
  getExamsWithImageCounts(@Query('etablissementID') etablissementID?: string) {
    return this.examenMedicalService.getExamsWithImageCounts(etablissementID);
  }

  @Get('radiologue/liste-avec-images')
  @Roles(UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Récupérer la liste des examens du radiologue avec le nombre d\'images' })
  @ApiResponse({ status: 200, description: 'Liste des examens du radiologue avec compteurs d\'images récupérée avec succès', type: [ExamenMedicalListDto] })
  getRadiologistExamsWithImageCounts(
    @Request() req?: any
  ) {
    return this.examenMedicalService.getRadiologistExamsWithImageCounts(req.user.utilisateurID);
  }

  @Get()
  @Roles(UserRole.MEDECIN, UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Récupérer tous les examens médicaux' })
  @ApiResponse({ status: 200, description: 'Liste des examens médicaux récupérée avec succès' })
  findAll(@Query('status') status?: string, @Query('category') category?: string, @Query('search') search?: string) {
    return this.examenMedicalService.findAll(status, category, search);
  }

  @Get('types')
  @Roles(UserRole.MEDECIN, UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Récupérer tous les types d\'examens' })
  @ApiResponse({ status: 200, description: 'Liste des types d\'examens récupérée avec succès' })
  getTypeExamens() {
    return this.examenMedicalService.getTypeExamens();
  }

  @Get(':id/can-edit')
  @Roles(UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Vérifier si le radiologue peut éditer cet examen' })
  @ApiResponse({ status: 200, description: 'Permission vérifiée', schema: { type: 'object', properties: { canEdit: { type: 'boolean' } } } })
  canEditExam(
    @Param('id') examenID: string,
    @Request() req: any
  ) {
    const radiologistID = req.user.utilisateurID;
    return this.examenMedicalService.canRadiologistEditExam(examenID, radiologistID);
  }

  @Get(':id')
  @Roles(UserRole.MEDECIN, UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Récupérer un examen médical par son ID' })
  @ApiResponse({ status: 200, description: 'Examen médical récupéré avec succès' })
  @ApiResponse({ status: 403, description: 'Permission refusée - radiologue non autorisé' })
  findOne(@Param('id') id: string, @Request() req: any) {
    const radiologistID = req.user.role === 'RADIOLOGUE' ? req.user.utilisateurID : undefined;
    return this.examenMedicalService.findOne(id, radiologistID);
  }

  @Patch(':id')
  @Roles(UserRole.MEDECIN, UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Mettre à jour un examen médical' })
  @ApiResponse({ status: 200, description: 'L\'examen médical a été mis à jour avec succès' })
  @ApiResponse({ status: 403, description: 'Permission refusée - établissement différent et non invité' })
  update(
    @Param('id') id: string, 
    @Body() updateExamenMedicalDto: UpdateExamenMedicalDto,
    @Request() req: any
  ) {
    const radiologistID = req.user.role === 'RADIOLOGUE' ? req.user.utilisateurID : undefined;
    return this.examenMedicalService.update(id, updateExamenMedicalDto, radiologistID);
  }

  @Delete(':id')
  @Roles(UserRole.MEDECIN, UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Supprimer un examen médical' })
  @ApiResponse({ status: 200, description: 'L\'examen médical a été supprimé avec succès' })
  remove(@Param('id') id: string) {
    return this.examenMedicalService.remove(id);
  }

  @Get('patient/:patientID')
  @Roles(UserRole.MEDECIN, UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Récupérer les examens médicaux d\'un patient' })
  @ApiResponse({ status: 200, description: 'Liste des examens médicaux du patient récupérée avec succès' })
  findByPatient(@Param('patientID') patientID: string) {
    return this.examenMedicalService.findByPatient(patientID);
  }

  @Get('dossier/:dossierID')
  @Roles(UserRole.MEDECIN, UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Récupérer les examens médicaux d\'un dossier médical' })
  @ApiResponse({ status: 200, description: 'Liste des examens médicaux du dossier récupérée avec succès' })
  findByDossier(@Param('dossierID') dossierID: string) {
    return this.examenMedicalService.findByDossier(dossierID);
  }

  @Put(':id/invite-radiologue/:radiologueId')
  @Roles(UserRole.RADIOLOGUE)
  @ApiOperation({ summary: "Inviter un radiologue à participer à l'examen" })
  @ApiResponse({ status: 200, description: "Radiologue invité avec succès" })
  inviteRadiologue(
    @Param('id') examenID: string,
    @Param('radiologueId') radiologueID: string
  ) {
    return this.examenMedicalService.inviteRadiologue(examenID, radiologueID);
  }

  @Get('radiologue/statistiques')
  @Roles(UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Récupérer les statistiques du dashboard radiologue' })
  @ApiResponse({ status: 200, description: 'Statistiques récupérées avec succès' })
  getRadiologistStats(@Request() req) {
    return this.examenMedicalService.getRadiologistStats(req.user.utilisateurID);
  }

  @Get('radiologue/examens-recents')
  @Roles(UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Récupérer les examens récents pour le radiologue' })
  @ApiResponse({ status: 200, description: 'Examens récents récupérés avec succès' })
  getRecentExams(@Request() req) {
    return this.examenMedicalService.getRecentExams(req.user.utilisateurID);
  }

  @Put(':id/marquer-analyse')
  @Roles(UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Marquer un examen comme analysé' })
  @ApiResponse({ status: 200, description: 'Examen marqué comme analysé' })
  @ApiResponse({ status: 403, description: 'Permission refusée - établissement différent et non invité' })
  markAsAnalyzed(
    @Param('id') examenID: string, 
    @Body() resultat: { resultat: string },
    @Request() req: any
  ) {
    const radiologistID = req.user.utilisateurID;
    return this.examenMedicalService.markAsAnalyzed(examenID, resultat.resultat, radiologistID);
  }

  // Image Management Endpoints
  @Get(':examenId/images')
  @Roles(UserRole.MEDECIN, UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Récupérer toutes les images d\'un examen médical' })
  @ApiResponse({ status: 200, description: 'Images de l\'examen récupérées avec succès' })
  @ApiResponse({ status: 403, description: 'Permission refusée - radiologue non autorisé' })
  getImagesByExam(@Param('examenId') examenID: string, @Request() req: any) {
    const radiologistID = req.user.role === 'RADIOLOGUE' ? req.user.utilisateurID : undefined;
    return this.examenMedicalService.getImagesByExam(examenID, radiologistID);
  }

  @Get(':examenId/images/count')
  @Roles(UserRole.MEDECIN, UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Récupérer le nombre d\'images d\'un examen médical' })
  @ApiResponse({ status: 200, description: 'Nombre d\'images récupéré avec succès' })
  getImageCountByExam(@Param('examenId') examenID: string) {
    return this.examenMedicalService.getImageCountByExam(examenID);
  }

  @Get('images/test/:sopInstanceUID')
  @Public()
  @ApiOperation({ summary: 'Test endpoint to check if image exists by SOP Instance UID' })
  @ApiResponse({ status: 200, description: 'Image exists' })
  @ApiResponse({ status: 404, description: 'Image not found' })
  async testImageExists(@Param('sopInstanceUID') sopInstanceUID: string) {
    this.logger.log(`Test endpoint called with SOP Instance UID: ${sopInstanceUID}`);
    
    try {
      const image = await this.examenMedicalService.findImageBySopInstanceUID(sopInstanceUID);
      this.logger.log(`Test endpoint success - Image found: ${image.imageID}`);
      return {
        exists: true,
        imageID: image.imageID,
        sopInstanceUID: image.sopInstanceUID,
        message: 'Image found'
      };
    } catch (error) {
      this.logger.error(`Test endpoint error: ${error.message}`);
      return {
        exists: false,
        message: error.message
      };
    }
  }

  @Get('images/sop/:sopInstanceUID')
  @Roles(UserRole.MEDECIN, UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Récupérer une image par son SOP Instance UID' })
  @ApiResponse({ status: 200, description: 'Image récupérée avec succès', type: ImageMedicaleDto })
  @ApiResponse({ status: 404, description: 'Image not found' })
  getImageBySopInstanceUID(@Param('sopInstanceUID') sopInstanceUID: string) {
    this.logger.log(`Get image by SOP Instance UID called: ${sopInstanceUID}`);
    return this.examenMedicalService.findImageBySopInstanceUID(sopInstanceUID);
  }

  @Post('images')
  @Roles(UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Ajouter une nouvelle image à un examen médical' })
  @ApiResponse({ status: 201, description: 'Image ajoutée avec succès' })
  @ApiResponse({ status: 403, description: 'Permission refusée - établissement différent et non invité' })
  createImage(
    @Body() createImageDto: CreateImageMedicaleDto,
    @Request() req: any
  ) {
    const radiologistID = req.user.role === 'RADIOLOGUE' ? req.user.utilisateurID : undefined;
    return this.examenMedicalService.createImage(createImageDto, radiologistID);
  }

  @Patch('images/:imageId')
  @Roles(UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Mettre à jour une image médicale' })
  @ApiResponse({ status: 200, description: 'Image mise à jour avec succès' })
  @ApiResponse({ status: 403, description: 'Permission refusée - établissement différent et non invité' })
  updateImage(
    @Param('imageId') imageID: string, 
    @Body() updateImageDto: UpdateImageMedicaleDto,
    @Request() req: any
  ) {
    const radiologistID = req.user.role === 'RADIOLOGUE' ? req.user.utilisateurID : undefined;
    return this.examenMedicalService.updateImage(imageID, updateImageDto, radiologistID);
  }

  @Delete('images/:imageId')
  @Roles(UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Supprimer une image médicale' })
  @ApiResponse({ status: 200, description: 'Image supprimée avec succès' })
  @ApiResponse({ status: 403, description: 'Permission refusée - établissement différent et non invité' })
  deleteImage(
    @Param('imageId') imageID: string,
    @Request() req: any
  ) {
    const radiologistID = req.user.role === 'RADIOLOGUE' ? req.user.utilisateurID : undefined;
    return this.examenMedicalService.deleteImage(imageID, radiologistID);
  }
} 