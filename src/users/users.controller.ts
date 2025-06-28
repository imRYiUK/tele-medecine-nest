import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req, UnauthorizedException, ForbiddenException, Query, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { CreateUserDto, UpdateUserDto, UserDto } from '../common/dto/user.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/constants/roles';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LogActivity } from '../common/decorators/log-activity.decorator';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private usersService: UsersService) {}

  private getUserId(req: Request): string {
    if (!req.user || !req.user['utilisateurID']) {
      throw new UnauthorizedException('Utilisateur non authentifié');
    }
    return req.user['utilisateurID'];
  }

  private getUserRole(req: Request): string {
    if (!req.user || !req.user['role']) {
      throw new UnauthorizedException('Rôle utilisateur non défini');
    }
    return req.user['role'];
  }

  private validateRoleHierarchy(requesterRole: string, targetRole: string) {
    if (requesterRole === UserRole.SUPER_ADMIN) {
      return true; // SUPER_ADMIN can manage all roles
    }
    if (requesterRole === UserRole.ADMINISTRATEUR && targetRole !== UserRole.SUPER_ADMIN) {
      return true; // ADMIN can manage all roles except SUPER_ADMIN
    }
    return false;
  }

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMINISTRATEUR)
  @LogActivity({
    typeAction: 'CREATION_UTILISATEUR',
    description: (result) => `Création d'un nouvel utilisateur: ${result.email}`,
  })
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully', type: UserDto })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 409, description: 'Username or email already exists' })
  async create(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
    const requesterRole = this.getUserRole(req);
    if (!this.validateRoleHierarchy(requesterRole, createUserDto.role)) {
      throw new ForbiddenException('Vous n\'avez pas les permissions nécessaires pour créer cet utilisateur');
    }
    const adminId = this.getUserId(req);
    return this.usersService.create(createUserDto, adminId);
  }

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMINISTRATEUR)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Returns all users', type: [UserDto] })
  async findAll(@Req() req: Request) {
    const requesterRole = this.getUserRole(req);
    return this.usersService.findAll(requesterRole);
  }

  @Get('search')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMINISTRATEUR, UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Search users by email, name, or username' })
  @ApiResponse({ status: 200, description: 'Returns matching users', type: [UserDto] })
  async searchUsers(@Query('q') query: string, @Req() req: Request) {
    this.logger.log(`Search request - query: ${query}, user: ${req.user?.['utilisateurID']}`);
    
    const requesterRole = this.getUserRole(req);
    this.logger.log(`Requester role: ${requesterRole}`);
    
    if (!query) {
      this.logger.log('Empty query, returning empty array');
      return [];
    }
    
    const results = await this.usersService.searchUsers(query, requesterRole);
    
    if (results === null) {
      this.logger.log('No results found (null)');
      return [];
    }
    
    if (Array.isArray(results)) {
      this.logger.log(`Search results count: ${results.length}`);
      return results;
    } else {
      this.logger.log('Search result: single user');
      return results;
    }
  }

  @Get('search/test')
  @Public()
  @ApiOperation({ summary: 'Test search users by email, name, or username (public)' })
  @ApiResponse({ status: 200, description: 'Returns matching users', type: [UserDto] })
  async testSearchUsers(@Query('q') query: string) {
    this.logger.log(`Test search request - query: ${query}`);
    
    if (!query) {
      this.logger.log('Empty query, returning empty array');
      return [];
    }
    
    const results = await this.usersService.searchUsers(query);
    
    if (results === null) {
      this.logger.log('No results found (null)');
      return [];
    }
    
    if (Array.isArray(results)) {
      this.logger.log(`Test search results count: ${results.length}`);
      return results;
    } else {
      this.logger.log('Test search result: single user');
      return results;
    }
  }

  @Get(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMINISTRATEUR)
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'Returns the user', type: UserDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const requesterRole = this.getUserRole(req);
    const user = await this.usersService.findOne(id);
    if (!this.validateRoleHierarchy(requesterRole, user.role)) {
      throw new ForbiddenException('Vous n\'avez pas les permissions nécessaires pour consulter cet utilisateur');
    }
    return user;
  }

  @Put(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMINISTRATEUR)
  @LogActivity({
    typeAction: 'MODIFICATION_UTILISATEUR',
    description: (result) => `Modification de l'utilisateur: ${result.email}`,
  })
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'User updated successfully', type: UserDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 409, description: 'Username or email already exists' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {
    const requesterRole = this.getUserRole(req);
    const user = await this.usersService.findOne(id);
    if (!this.validateRoleHierarchy(requesterRole, user.role)) {
      throw new ForbiddenException('Vous n\'avez pas les permissions nécessaires pour modifier cet utilisateur');
    }
    if (updateUserDto.role && !this.validateRoleHierarchy(requesterRole, updateUserDto.role)) {
      throw new ForbiddenException('Vous n\'avez pas les permissions nécessaires pour attribuer ce rôle');
    }
    const adminId = this.getUserId(req);
    return this.usersService.update(id, updateUserDto, adminId);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMINISTRATEUR)
  @LogActivity({
    typeAction: 'SUPPRESSION_UTILISATEUR',
    description: (result) => `Suppression de l'utilisateur: ${result.email}`,
  })
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(@Param('id') id: string, @Req() req: Request) {
    const requesterRole = this.getUserRole(req);
    const user = await this.usersService.findOne(id);
    if (!this.validateRoleHierarchy(requesterRole, user.role)) {
      throw new ForbiddenException('Vous n\'avez pas les permissions nécessaires pour supprimer cet utilisateur');
    }
    const adminId = this.getUserId(req);
    return this.usersService.remove(id, adminId);
  }

  @Get('profile/me')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMINISTRATEUR, UserRole.RADIOLOGUE, UserRole.MEDECIN, UserRole.RECEPTIONNISTE, UserRole.TECHNICIEN)
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns the current user profile',
    type: UserDto 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - User not found or token invalid' 
  })
  async getProfile(@Req() req: Request) {
    const userId = this.getUserId(req);
    return this.usersService.getProfile(userId);
  }

  @Put('profile/me')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMINISTRATEUR, UserRole.RADIOLOGUE, UserRole.MEDECIN, UserRole.RECEPTIONNISTE, UserRole.TECHNICIEN)
  @LogActivity({
    typeAction: 'MODIFICATION_PROFIL',
    description: 'Modification du profil utilisateur',
  })
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({ 
    status: 200, 
    description: 'Profile updated successfully',
    type: UserDto 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - User not found or token invalid' 
  })
  async updateProfile(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    const userId = this.getUserId(req);
    return this.usersService.updateProfile(userId, updateUserDto);
  }

  @Get('medecins/etablissement/:etablissementID')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMINISTRATEUR, UserRole.RECEPTIONNISTE)
  @ApiOperation({ summary: 'Get all medecins for a given etablissement' })
  @ApiResponse({ status: 200, description: 'Returns all medecins for the etablissement', type: [UserDto] })
  async findMedecinsByEtablissement(@Param('etablissementID') etablissementID: string) {
    return this.usersService.findMedecinsByEtablissement(etablissementID);
  }
}
