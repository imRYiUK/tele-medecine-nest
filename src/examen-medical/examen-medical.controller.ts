import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ExamenMedicalService } from './examen-medical.service';
import { CreateExamenMedicalDto } from './dto/create-examen-medical.dto';
import { UpdateExamenMedicalDto } from './dto/update-examen-medical.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/constants/roles';

@Controller('examens-medicaux')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Examens médicaux')
@ApiBearerAuth()
export class ExamenMedicalController {
  constructor(private readonly examenMedicalService: ExamenMedicalService) {}

  @Post()
  @Roles(UserRole.MEDECIN, UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Créer un nouvel examen médical' })
  @ApiResponse({ status: 201, description: 'L\'examen médical a été créé avec succès' })
  create(@Body() createExamenMedicalDto: CreateExamenMedicalDto, @Request() req) {
    return this.examenMedicalService.create(createExamenMedicalDto, req.user.utilisateurID);
  }

  @Get()
  @Roles(UserRole.MEDECIN, UserRole.RADIOLOGUE, UserRole.TECHNICIEN)
  @ApiOperation({ summary: 'Récupérer tous les examens médicaux' })
  @ApiResponse({ status: 200, description: 'Liste des examens médicaux récupérée avec succès' })
  findAll() {
    return this.examenMedicalService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.MEDECIN, UserRole.RADIOLOGUE, UserRole.TECHNICIEN)
  @ApiOperation({ summary: 'Récupérer un examen médical par son ID' })
  @ApiResponse({ status: 200, description: 'Examen médical récupéré avec succès' })
  findOne(@Param('id') id: string) {
    return this.examenMedicalService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.MEDECIN, UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Mettre à jour un examen médical' })
  @ApiResponse({ status: 200, description: 'L\'examen médical a été mis à jour avec succès' })
  update(@Param('id') id: string, @Body() updateExamenMedicalDto: UpdateExamenMedicalDto) {
    return this.examenMedicalService.update(id, updateExamenMedicalDto);
  }

  @Delete(':id')
  @Roles(UserRole.MEDECIN, UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Supprimer un examen médical' })
  @ApiResponse({ status: 200, description: 'L\'examen médical a été supprimé avec succès' })
  remove(@Param('id') id: string) {
    return this.examenMedicalService.remove(id);
  }

  @Get('patient/:patientID')
  @Roles(UserRole.MEDECIN, UserRole.RADIOLOGUE, UserRole.TECHNICIEN)
  @ApiOperation({ summary: 'Récupérer les examens médicaux d\'un patient' })
  @ApiResponse({ status: 200, description: 'Liste des examens médicaux du patient récupérée avec succès' })
  findByPatient(@Param('patientID') patientID: string) {
    return this.examenMedicalService.findByPatient(patientID);
  }

  @Get('dossier/:dossierID')
  @Roles(UserRole.MEDECIN, UserRole.RADIOLOGUE, UserRole.TECHNICIEN)
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
} 