import { Controller, Post, Get, Param, Body, Req, UseGuards } from '@nestjs/common';
import { ImageCollaborationService } from './image-collaboration.service';
// import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'; // Uncomment if you have auth guards

@Controller('examen-medical/images')
// @UseGuards(JwtAuthGuard) // Uncomment if you have auth guards
export class ImageCollaborationController {
  constructor(private readonly collaborationService: ImageCollaborationService) {}

  @Post(':imageID/invite')
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
  async collaborators(@Param('imageID') imageID: string) {
    return this.collaborationService.listCollaborators(imageID);
  }
} 