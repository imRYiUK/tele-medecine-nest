import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ImageCollaborationService {
  constructor(private readonly prisma: PrismaService) {}

  async inviteRadiologistToImage(imageID: string, inviterID: string, inviteeID: string) {
    // Check if inviter is already a collaborator or owner (has access to the image)
    const image = await this.prisma.imageMedicale.findUnique({
      where: { imageID },
      include: {
        collaborations: true,
      },
    });
    if (!image) throw new NotFoundException('Image not found');
    const isCollaborator = image.collaborations.some(
      (c) => c.inviterID === inviterID || c.inviteeID === inviterID
    );
    if (!isCollaborator) throw new ForbiddenException('You do not have access to invite on this image');
    // Prevent duplicate invitation
    const alreadyInvited = image.collaborations.some(
      (c) => c.inviteeID === inviteeID
    );
    if (alreadyInvited) throw new ForbiddenException('This radiologist is already a collaborator');
    // Create collaboration
    return this.prisma.imageCollaboration.create({
      data: {
        imageID,
        inviterID,
        inviteeID,
      },
    });
  }

  async listCollaborators(imageID: string) {
    const collaborations = await this.prisma.imageCollaboration.findMany({
      where: { imageID },
      include: {
        invitee: true,
      },
    });
    return collaborations.map((c) => c.invitee);
  }

  async sendMessage(imageID: string, senderID: string, content: string) {
    // Check if sender is a collaborator (inviter or invitee) on this image
    const collaborations = await this.prisma.imageCollaboration.findMany({
      where: { imageID },
    });
    const isCollaborator = collaborations.some(
      (c) => c.inviterID === senderID || c.inviteeID === senderID
    );
    if (!isCollaborator) throw new ForbiddenException('You are not a collaborator on this image');
    // Create chat message
    return this.prisma.chatMessage.create({
      data: {
        imageID,
        senderID,
        content,
      },
    });
  }

  async getMessages(imageID: string) {
    return this.prisma.chatMessage.findMany({
      where: { imageID },
      orderBy: { timestamp: 'asc' },
    });
  }
} 