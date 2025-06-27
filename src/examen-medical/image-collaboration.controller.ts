import { Controller, Post, Get, Param, Body, Req, UseGuards } from '@nestjs/common';
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
  constructor(private readonly collaborationService: ImageCollaborationService) {}

  @Post(':imageID/invite')
  @Roles(UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Inviter un radiologue à collaborer sur une image' })
  @ApiResponse({ status: 201, description: 'Invitation envoyée avec succès' })
  async invite(
    @Param('imageID') imageID: string,
    @Body('inviteeID') inviteeID: string,
    @Req() req: any
  ) {
    // req.user.utilisateurID is the inviter
    return this.collaborationService.inviteRadiologistToImage(
      imageID,
      req.user.utilisateurID,
      inviteeID
    );
  }

  @Get(':imageID/collaborators')
  @Roles(UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Lister les collaborateurs d\'une image' })
  @ApiResponse({ status: 200, description: 'Liste des collaborateurs récupérée' })
  async collaborators(@Param('imageID') imageID: string) {
    return this.collaborationService.listCollaborators(imageID);
  }

  @Post(':imageID/messages')
  @Roles(UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Envoyer un message sur une image' })
  @ApiResponse({ status: 201, description: 'Message envoyé avec succès', type: ChatMessageDto })
  async sendMessage(
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
  async getMessages(@Param('imageID') imageID: string) {
    return this.collaborationService.getMessages(imageID);
  }

  @Get('user/collaborations')
  @Roles(UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Récupérer les collaborations d\'un utilisateur' })
  @ApiResponse({ status: 200, description: 'Collaborations récupérées avec succès' })
  async getUserCollaborations(@Req() req: any) {
    return this.collaborationService.getUserCollaborations(req.user.utilisateurID);
  }

  @Get('user/pending-collaborations')
  @Roles(UserRole.RADIOLOGUE)
  @ApiOperation({ summary: 'Récupérer les collaborations en attente d\'un utilisateur' })
  @ApiResponse({ status: 200, description: 'Collaborations en attente récupérées' })
  async getPendingCollaborations(@Req() req: any) {
    return this.collaborationService.getPendingCollaborations(req.user.utilisateurID);
  }
} 