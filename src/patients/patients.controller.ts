import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { FindPatientsDto } from './dto/find-patients.dto';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/constants/roles';
import { LogActivity } from '../common/decorators/log-activity.decorator';
import { Request } from 'express';

@ApiTags('patients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  private getUserId(req: Request): string {
    if (!req.user || !req.user['utilisateurID']) {
      throw new UnauthorizedException('Utilisateur non authentifié');
    }
    return req.user['utilisateurID'];
  }

  @Post()
  @Roles(UserRole.ADMINISTRATEUR, UserRole.PERSONNEL_ADMINISTRATIF, UserRole.MEDECIN)
  @LogActivity({
    typeAction: 'CREATION_PATIENT',
    description: (result) => `Création d'un nouveau patient: ${result.nom} ${result.prenom}`,
  })
  @ApiOperation({ summary: 'Créer un nouveau patient' })
  @ApiResponse({ status: 201, description: 'Patient créé avec succès' })
  create(@Body() createPatientDto: CreatePatientDto, @Req() req: Request) {
    return this.patientsService.create(createPatientDto, this.getUserId(req));
  }

  @Get()
  @Roles(UserRole.ADMINISTRATEUR, UserRole.PERSONNEL_ADMINISTRATIF, UserRole.MEDECIN, UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Récupérer la liste des patients avec pagination et filtrage' })
  @ApiResponse({ status: 200, description: 'Liste des patients récupérée avec succès' })
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMINISTRATEUR, UserRole.PERSONNEL_ADMINISTRATIF, UserRole.MEDECIN, UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Récupérer un patient par son ID' })
  @ApiResponse({ status: 200, description: 'Patient récupéré avec succès' })
  @ApiResponse({ status: 404, description: 'Patient non trouvé' })
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMINISTRATEUR, UserRole.PERSONNEL_ADMINISTRATIF, UserRole.MEDECIN)
  @LogActivity({
    typeAction: 'MODIFICATION_PATIENT',
    description: (result) => `Modification du patient: ${result.nom} ${result.prenom}`,
  })
  @ApiOperation({ summary: 'Mettre à jour un patient' })
  @ApiResponse({ status: 200, description: 'Patient mis à jour avec succès' })
  @ApiResponse({ status: 404, description: 'Patient non trouvé' })
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto, @Req() req: Request) {
    return this.patientsService.update(id, updatePatientDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMINISTRATEUR)
  @LogActivity({
    typeAction: 'SUPPRESSION_PATIENT',
    description: (result) => `Suppression du patient: ${result.nom} ${result.prenom}`,
  })
  @ApiOperation({ summary: 'Supprimer un patient' })
  @ApiResponse({ status: 200, description: 'Patient supprimé avec succès' })
  @ApiResponse({ status: 404, description: 'Patient non trouvé' })
  remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }

  @Post(':id/medical-record')
  @Roles('ADMINISTRATEUR', 'MEDECIN')
  @LogActivity({
    typeAction: 'CREATION_DOSSIER_MEDICAL',
    description: 'Création d\'un dossier médical pour un patient',
  })
  createMedicalRecord(
    @Param('id') id: string,
    @Body() createMedicalRecordDto: CreateMedicalRecordDto,
    @Req() req,
  ) {
    return this.patientsService.createMedicalRecord(id, createMedicalRecordDto, req.user.userId);
  }

  @Get(':id/medical-record')
  @Roles('ADMINISTRATEUR', 'MEDECIN')
  getMedicalRecord(@Param('id') id: string) {
    return this.patientsService.getMedicalRecord(id);
  }

  @Patch(':id/medical-record')
  @Roles('ADMINISTRATEUR', 'MEDECIN')
  @LogActivity({
    typeAction: 'MODIFICATION_DOSSIER_MEDICAL',
    description: 'Modification d\'un dossier médical',
  })
  updateMedicalRecord(
    @Param('id') id: string,
    @Body() updateMedicalRecordDto: CreateMedicalRecordDto,
  ) {
    return this.patientsService.updateMedicalRecord(id, updateMedicalRecordDto);
  }
}
