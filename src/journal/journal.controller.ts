import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/constants/roles';
import { JournalService } from './journal.service';

@Controller('journal')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Journal d\'activité')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMINISTRATEUR)
  @ApiOperation({ summary: 'Récupérer tout l\'historique des actions' })
  @ApiResponse({ status: 200, description: 'Liste des actions récupérée avec succès' })
  async findAll(@Request() req) {
    return this.journalService.findAll(req.user.utilisateurID, req.user.role);
  }

  @Get('user')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMINISTRATEUR)
  @ApiOperation({ summary: 'Récupérer l\'historique des actions d\'un utilisateur' })
  @ApiQuery({ name: 'utilisateurID', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Liste des actions de l\'utilisateur récupérée avec succès' })
  async findByUser(@Query('utilisateurID') utilisateurID: string, @Request() req) {
    return this.journalService.findByUser(utilisateurID, req.user.utilisateurID, req.user.role);
  }

  @Get('date-range')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMINISTRATEUR)
  @ApiOperation({ summary: 'Récupérer l\'historique des actions sur une période donnée' })
  @ApiQuery({ name: 'startDate', required: true, type: Date })
  @ApiQuery({ name: 'endDate', required: true, type: Date })
  @ApiResponse({ status: 200, description: 'Liste des actions sur la période récupérée avec succès' })
  async findByDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Request() req
  ) {
    return this.journalService.findByDateRange(
      new Date(startDate),
      new Date(endDate),
      req.user.utilisateurID,
      req.user.role
    );
  }

  @Get('type')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMINISTRATEUR)
  @ApiOperation({ summary: 'Récupérer l\'historique des actions par type' })
  @ApiQuery({ name: 'typeAction', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Liste des actions du type spécifié récupérée avec succès' })
  async findByTypeAction(@Query('typeAction') typeAction: string, @Request() req) {
    return this.journalService.findByTypeAction(typeAction, req.user.utilisateurID, req.user.role);
  }
} 