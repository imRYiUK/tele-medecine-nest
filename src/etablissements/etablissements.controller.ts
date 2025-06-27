import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { EtablissementsService } from './etablissements.service';
import { CreateEtablissementDto, UpdateEtablissementDto, EtablissementDto } from './dto/etablissement.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/constants/roles';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { LogActivity } from '../common/decorators/log-activity.decorator';
import { TypeEtablissement } from '@prisma/client';

@ApiTags('etablissements')
@Controller('etablissements')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EtablissementsController {
  constructor(private readonly etablissementsService: EtablissementsService) {}

  @Post()
  @Roles(UserRole.SUPER_ADMIN)
  @LogActivity({
    typeAction: 'CREATION_ETABLISSEMENT',
    description: (result) => `Création d'un nouvel établissement: ${result.nom}`,
  })
  @ApiOperation({ summary: 'Create a new establishment' })
  @ApiResponse({ status: 201, description: 'Establishment created successfully', type: EtablissementDto })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 409, description: 'Email or phone number already exists' })
  async create(@Body() createEtablissementDto: CreateEtablissementDto): Promise<EtablissementDto> {
    return this.etablissementsService.create(createEtablissementDto);
  }

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMINISTRATEUR)
  @ApiOperation({ summary: 'Get all establishments' })
  @ApiResponse({ status: 200, description: 'Returns all establishments', type: [EtablissementDto] })
  async findAll(): Promise<EtablissementDto[]> {
    return this.etablissementsService.findAll();
  }

  @Get('region/:region')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMINISTRATEUR)
  @ApiOperation({ summary: 'Get establishments by region' })
  @ApiResponse({ status: 200, description: 'Returns establishments in the specified region', type: [EtablissementDto] })
  async findByRegion(@Param('region') region: string): Promise<EtablissementDto[]> {
    return this.etablissementsService.findByRegion(region);
  }

  @Get('type/:type')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMINISTRATEUR)
  @ApiOperation({ summary: 'Get establishments by type' })
  @ApiResponse({ status: 200, description: 'Returns establishments of the specified type', type: [EtablissementDto] })
  async findByType(@Param('type') type: TypeEtablissement): Promise<EtablissementDto[]> {
    return this.etablissementsService.findByType(type);
  }

  @Get(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMINISTRATEUR)
  @ApiOperation({ summary: 'Get an establishment by ID' })
  @ApiResponse({ status: 200, description: 'Returns the establishment', type: EtablissementDto })
  @ApiResponse({ status: 404, description: 'Establishment not found' })
  async findOne(@Param('id') id: string): Promise<EtablissementDto> {
    return this.etablissementsService.findOne(id);
  }

  @Put(':id')
  @Roles(UserRole.SUPER_ADMIN)
  @LogActivity({
    typeAction: 'MODIFICATION_ETABLISSEMENT',
    description: (result) => `Modification de l'établissement: ${result.nom}`,
  })
  @ApiOperation({ summary: 'Update an establishment' })
  @ApiResponse({ status: 200, description: 'Establishment updated successfully', type: EtablissementDto })
  @ApiResponse({ status: 404, description: 'Establishment not found' })
  @ApiResponse({ status: 409, description: 'Email or phone number already exists' })
  async update(
    @Param('id') id: string,
    @Body() updateEtablissementDto: UpdateEtablissementDto,
  ): Promise<EtablissementDto> {
    return this.etablissementsService.update(id, updateEtablissementDto);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN)
  @LogActivity({
    typeAction: 'SUPPRESSION_ETABLISSEMENT',
    description: (result) => `Suppression de l'établissement: ${result.nom}`,
  })
  @ApiOperation({ summary: 'Delete an establishment' })
  @ApiResponse({ status: 200, description: 'Establishment deleted successfully' })
  @ApiResponse({ status: 404, description: 'Establishment not found' })
  @ApiResponse({ status: 409, description: 'Cannot delete establishment with associated users' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.etablissementsService.remove(id);
  }
} 