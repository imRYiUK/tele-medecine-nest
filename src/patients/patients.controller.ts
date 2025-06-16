import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
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

@ApiTags('patients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @Roles(UserRole.ADMINISTRATEUR, UserRole.PERSONNEL_ADMINISTRATIF, UserRole.MEDECIN)
  @ApiOperation({ summary: 'Créer un nouveau patient' })
  @ApiResponse({ status: 201, description: 'Patient créé avec succès' })
  create(@Body() createPatientDto: CreatePatientDto, @Req() req) {
    return this.patientsService.create(createPatientDto, req.user.id);
  }

  @Get()
  @Roles(UserRole.ADMINISTRATEUR, UserRole.PERSONNEL_ADMINISTRATIF, UserRole.MEDECIN, UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Récupérer la liste des patients avec pagination et filtrage' })
  @ApiResponse({ status: 200, description: 'Liste des patients récupérée avec succès' })
  findAll(@Query() query: FindPatientsDto) {
    return this.patientsService.findAll(query);
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
  @ApiOperation({ summary: 'Mettre à jour un patient' })
  @ApiResponse({ status: 200, description: 'Patient mis à jour avec succès' })
  @ApiResponse({ status: 404, description: 'Patient non trouvé' })
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto, @Req() req) {
    return this.patientsService.update(id, updatePatientDto, req.user.id);
  }

  @Delete(':id')
  @Roles(UserRole.ADMINISTRATEUR)
  @ApiOperation({ summary: 'Supprimer un patient' })
  @ApiResponse({ status: 200, description: 'Patient supprimé avec succès' })
  @ApiResponse({ status: 404, description: 'Patient non trouvé' })
  remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }
}

@ApiTags('medical-records')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @Roles(UserRole.ADMINISTRATEUR, UserRole.MEDECIN)
  @ApiOperation({ summary: 'Créer un nouveau dossier médical' })
  @ApiResponse({ status: 201, description: 'Dossier médical créé avec succès' })
  create(@Body() createMedicalRecordDto: CreateMedicalRecordDto, @Req() req) {
    return this.patientsService.createMedicalRecord(createMedicalRecordDto, req.user.id);
  }
}
