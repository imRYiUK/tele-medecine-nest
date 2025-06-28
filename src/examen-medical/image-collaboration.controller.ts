import { Controller, Post, Get, Param, Body, Req, UseGuards, Logger } from '@nestjs/common';
import { ImageCollaborationService } from './image-collaboration.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/constants/roles';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateChatMessageDto, ChatMessageDto } from './dto/chat-message.dto';

@Controller('examen-medical/images')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Image Collaboration')
@ApiBearerAuth()
export class ImageCollaborationController {
  private readonly logger = new Logger(ImageCollaborationController.name);

  constructor(private readonly collaborationService: ImageCollaborationService) {}

  // ===== USER-CENTRIC ENDPOINTS (All Images) =====

  @Get('user/received-invitations')
  @Roles(UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Récupérer toutes les invitations reçues par l\'utilisateur (Invitee)' })
  @ApiResponse({ status: 200, description: 'Invitations reçues récupérées' })
  async getReceivedInvitations(@Req() req: any) {
    return this.collaborationService.getPendingCollaborations(req.user.utilisateurID);
  }

  @Get('user/sent-invitations')
  @Roles(UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Récupérer toutes les invitations envoyées par l\'utilisateur (Inviter)' })
  @ApiResponse({ status: 200, description: 'Invitations envoyées récupérées' })
  async getSentInvitations(@Req() req: any) {
    return this.collaborationService.getSentInvitations(req.user.utilisateurID);
  }

  @Get('user/active-collaborations')
  @Roles(UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Récupérer toutes les collaborations actives de l\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Collaborations actives récupérées' })
  async getActiveCollaborations(@Req() req: any) {
    return this.collaborationService.getUserCollaborations(req.user.utilisateurID);
  }

  // ===== INVITATION MANAGEMENT (Inviter Perspective) =====
  
  @Post(':imageID/invite')
  @Roles(UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Inviter un radiologue à collaborer sur une image (Inviter)' })
  @ApiResponse({ status: 201, description: 'Invitation envoyée avec succès' })
  async inviteRadiologistToImage(
    @Param('imageID') imageID: string,
    @Body('inviteeID') inviteeID: string,
    @Req() req: any
  ) {
    this.logger.log(`Invite request - imageID: ${imageID}, inviteeID: ${inviteeID}, inviterID: ${req.user?.utilisateurID}`);
    
    const result = await this.collaborationService.inviteRadiologistToImage(
      imageID,
      req.user.utilisateurID,
      inviteeID
    );
    
    this.logger.log(`Invite request completed successfully`);
    return result;
  }

  @Post('sop/:sopInstanceUID/invite')
  @Roles(UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Inviter un radiologue à collaborer sur une image par SOP Instance UID (Inviter)' })
  @ApiResponse({ status: 201, description: 'Invitation envoyée avec succès' })
  @ApiResponse({ status: 404, description: 'Image not found' })
  async inviteRadiologistToImageBySopInstanceUID(
    @Param('sopInstanceUID') sopInstanceUID: string,
    @Body('inviteeID') inviteeID: string,
    @Req() req: any
  ) {
    this.logger.log(`SOP Invite request - sopInstanceUID: ${sopInstanceUID}, inviteeID: ${inviteeID}, inviterID: ${req.user?.utilisateurID}`);
    
    const image = await this.collaborationService.findImageBySopInstanceUID(sopInstanceUID);
    this.logger.log(`Found image by SOP Instance UID - imageID: ${image.imageID}`);
    
    const result = await this.collaborationService.inviteRadiologistToImage(
      image.imageID,
      req.user.utilisateurID,
      inviteeID
    );
    
    this.logger.log(`SOP Invite request completed successfully`);
    return result;
  }

  // ===== INVITATION RESPONSE (Invitee Perspective) =====

  @Post('collaborations/:collaborationId/accept')
  @Roles(UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Accepter une invitation de collaboration (Invitee)' })
  @ApiResponse({ status: 200, description: 'Invitation acceptée avec succès' })
  async acceptCollaborationInvitation(
    @Param('collaborationId') collaborationId: string,
    @Req() req: any
  ) {
    return this.collaborationService.acceptCollaboration(
      collaborationId,
      req.user.utilisateurID
    );
  }

  @Post('collaborations/:collaborationId/reject')
  @Roles(UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Rejeter une invitation de collaboration (Invitee)' })
  @ApiResponse({ status: 200, description: 'Invitation rejetée avec succès' })
  async rejectCollaborationInvitation(
    @Param('collaborationId') collaborationId: string,
    @Req() req: any
  ) {
    return this.collaborationService.rejectCollaboration(
      collaborationId,
      req.user.utilisateurID
    );
  }

  // ===== COLLABORATORS LISTING =====

  @Get(':imageID/collaborators')
  @Roles(UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Lister les collaborateurs d\'une image' })
  @ApiResponse({ status: 200, description: 'Liste des collaborateurs récupérée' })
  async getImageCollaborators(@Param('imageID') imageID: string) {
    return this.collaborationService.listCollaborators(imageID);
  }

  @Get('sop/:sopInstanceUID/collaborators')
  @Roles(UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Lister les collaborateurs d\'une image par SOP Instance UID' })
  @ApiResponse({ status: 200, description: 'Liste des collaborateurs récupérée' })
  @ApiResponse({ status: 404, description: 'Image not found' })
  async getImageCollaboratorsBySopInstanceUID(@Param('sopInstanceUID') sopInstanceUID: string) {
    this.logger.log(`SOP Collaborators request - sopInstanceUID: ${sopInstanceUID}`);
    
    const image = await this.collaborationService.findImageBySopInstanceUID(sopInstanceUID);
    this.logger.log(`Found image by SOP Instance UID - imageID: ${image.imageID}`);
    
    const result = await this.collaborationService.listCollaborators(image.imageID);
    
    this.logger.log(`SOP Collaborators request completed successfully`);
    return result;
  }

  @Get('sop/:sopInstanceUID/pending-collaborations')
  @Roles(UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Lister les collaborations en attente d\'une image par SOP Instance UID' })
  @ApiResponse({ status: 200, description: 'Liste des collaborations en attente récupérée' })
  @ApiResponse({ status: 404, description: 'Image not found' })
  async getPendingCollaborationsBySopInstanceUID(@Param('sopInstanceUID') sopInstanceUID: string) {
    this.logger.log(`SOP Pending Collaborations request - sopInstanceUID: ${sopInstanceUID}`);
    
    const image = await this.collaborationService.findImageBySopInstanceUID(sopInstanceUID);
    this.logger.log(`Found image by SOP Instance UID - imageID: ${image.imageID}`);
    
    const result = await this.collaborationService.getAllPendingCollaborationsForImage(image.imageID);
    
    this.logger.log(`SOP Pending Collaborations request completed successfully`);
    return result;
  }

  // ===== CHAT MESSAGES =====

  @Post(':imageID/messages')
  @Roles(UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Envoyer un message sur une image' })
  @ApiResponse({ status: 201, description: 'Message envoyé avec succès', type: ChatMessageDto })
  async sendMessageOnImage(
    @Param('imageID') imageID: string,
    @Body() createMessageDto: CreateChatMessageDto,
    @Req() req: any
  ) {
    return this.collaborationService.sendMessage(
      imageID,
      req.user.utilisateurID,
      createMessageDto.content
    );
  }

  @Get(':imageID/messages')
  @Roles(UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Récupérer les messages d\'une image' })
  @ApiResponse({ status: 200, description: 'Messages récupérés avec succès', type: [ChatMessageDto] })
  async getImageMessages(@Param('imageID') imageID: string) {
    return this.collaborationService.getMessages(imageID);
  }
} 