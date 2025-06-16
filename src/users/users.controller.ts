import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { CreateUserDto, UpdateUserDto, UserDto } from '../common/dto/user.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/constants/roles';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LogActivity } from '../common/decorators/log-activity.decorator';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  private getUserId(req: Request): string {
    if (!req.user || !req.user['utilisateurID']) {
      throw new UnauthorizedException('Utilisateur non authentifié');
    }
    return req.user['utilisateurID'];
  }

  @Post()
  @Roles(UserRole.ADMINISTRATEUR)
  @LogActivity({
    typeAction: 'CREATION_UTILISATEUR',
    description: (result) => `Création d'un nouvel utilisateur: ${result.email}`,
  })
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully', type: UserDto })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 409, description: 'Username or email already exists' })
  async create(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
    const adminId = this.getUserId(req);
    return this.usersService.create(createUserDto, adminId);
  }

  @Get()
  @Roles(UserRole.ADMINISTRATEUR)
  @LogActivity({
    typeAction: 'CONSULTATION_UTILISATEURS',
    description: 'Consultation de la liste des utilisateurs',
  })
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Returns all users', type: [UserDto] })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMINISTRATEUR)
  @LogActivity({
    typeAction: 'CONSULTATION_UTILISATEUR',
    description: (result) => `Consultation de l'utilisateur: ${result.email}`,
  })
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'Returns the user', type: UserDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMINISTRATEUR)
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
    const adminId = this.getUserId(req);
    return this.usersService.update(id, updateUserDto, adminId);
  }

  @Delete(':id')
  @Roles(UserRole.ADMINISTRATEUR)
  @LogActivity({
    typeAction: 'SUPPRESSION_UTILISATEUR',
    description: (result) => `Suppression de l'utilisateur: ${result.email}`,
  })
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(@Param('id') id: string, @Req() req: Request) {
    const adminId = this.getUserId(req);
    return this.usersService.remove(id, adminId);
  }

  @Get('profile/me')
  @Roles(UserRole.ADMINISTRATEUR, UserRole.RADIOLOGUE, UserRole.MEDECIN, UserRole.PERSONNEL_ADMINISTRATIF, UserRole.TECHNICIEN)
  @LogActivity({
    typeAction: 'CONSULTATION_PROFIL',
    description: 'Consultation du profil utilisateur',
  })
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
  @Roles(UserRole.ADMINISTRATEUR, UserRole.RADIOLOGUE, UserRole.MEDECIN, UserRole.PERSONNEL_ADMINISTRATIF, UserRole.TECHNICIEN)
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
}
