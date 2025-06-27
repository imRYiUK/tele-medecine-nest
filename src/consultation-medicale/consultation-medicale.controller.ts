import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ConsultationMedicaleService } from './consultation-medicale.service';
import { CreateConsultationMedicaleDto } from './dto/create-consultation-medicale.dto';
import { UpdateConsultationMedicaleDto } from './dto/update-consultation-medicale.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import {UserRole} from '../common/constants/roles';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('consultations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ConsultationMedicaleController {
  constructor(private readonly consultationMedicaleService: ConsultationMedicaleService) {}

  @Post()
  @Roles(UserRole.MEDECIN)
  create(@Body() createConsultationMedicaleDto: CreateConsultationMedicaleDto, @Request() req) {
    return this.consultationMedicaleService.create(createConsultationMedicaleDto);
  }

  @Get()
  @Roles(UserRole.ADMINISTRATEUR, UserRole.SUPER_ADMIN)
  findAll() {
    return this.consultationMedicaleService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMINISTRATEUR, UserRole.SUPER_ADMIN, UserRole.MEDECIN)
  findOne(@Param('id') id: string) {
    return this.consultationMedicaleService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.MEDECIN)
  update(
    @Param('id') id: string,
    @Body() updateConsultationMedicaleDto: UpdateConsultationMedicaleDto,
  ) {
    return this.consultationMedicaleService.update(id, updateConsultationMedicaleDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMINISTRATEUR, UserRole.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.consultationMedicaleService.remove(id);
  }

  @Get('patient/:patientId')
  @Roles(UserRole.ADMINISTRATEUR, UserRole.SUPER_ADMIN, UserRole.MEDECIN)
  findByPatient(@Param('patientId') patientId: string) {
    return this.consultationMedicaleService.findByPatient(patientId);
  }

  @Get('patient/:patientId/count')
  @Roles(UserRole.ADMINISTRATEUR, UserRole.RECEPTIONNISTE, UserRole.MEDECIN, UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Récupérer le nombre de consultations d\'un patient' })
  @ApiResponse({ status: 200, description: 'Nombre de consultations récupéré avec succès' })
  getConsultationCount(@Param('patientId') patientId: string) {
    return this.consultationMedicaleService.getConsultationCount(patientId);
  }

  @Get('dossier/:dossierId')
  @Roles(UserRole.ADMINISTRATEUR, UserRole.SUPER_ADMIN, UserRole.MEDECIN)
  findByDossier(@Param('dossierId') dossierId: string) {
    return this.consultationMedicaleService.findByDossier(dossierId);
  }

  @Get('medecin/:medecinId')
  @Roles(UserRole.ADMINISTRATEUR, UserRole.SUPER_ADMIN, UserRole.MEDECIN)
  findByMedecin(@Param('medecinId') medecinId: string) {
    return this.consultationMedicaleService.findByMedecin(medecinId);
  }
} 