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
        collaborations: {
          where: {
            status: {
              in: ['ACCEPTED']
            }
          }
        },
      },
    });
    if (!image) throw new NotFoundException('Image not found');
    
    const isCollaborator = image.collaborations.some(
      (c) => c.inviterID === inviterID || c.inviteeID === inviterID
    );
    if (!isCollaborator) throw new ForbiddenException('You do not have access to invite on this image');
    
    // Check if there's already a pending or accepted invitation
    const existingCollaboration = await this.prisma.imageCollaboration.findFirst({
      where: {
        imageID,
        inviteeID,
        status: {
          in: ['PENDING', 'ACCEPTED']
        }
      }
    });
    
    if (existingCollaboration) {
      if (existingCollaboration.status === 'ACCEPTED') {
        throw new ForbiddenException('This radiologist is already a collaborator');
      } else {
        throw new ForbiddenException('An invitation is already pending for this radiologist');
      }
    }
    
    // Create collaboration with PENDING status
    return this.prisma.imageCollaboration.create({
      data: {
        imageID,
        inviterID,
        inviteeID,
        status: 'PENDING',
      },
      include: {
        inviter: true,
        invitee: true,
        image: {
          include: {
            examen: {
              include: {
                patient: true,
                typeExamen: true,
              },
            },
          },
        },
      },
    });
  }

  async acceptCollaboration(collaborationId: string, inviteeID: string) {
    const collaboration = await this.prisma.imageCollaboration.findUnique({
      where: { id: collaborationId },
    });
    
    if (!collaboration) {
      throw new NotFoundException('Collaboration not found');
    }
    
    if (collaboration.inviteeID !== inviteeID) {
      throw new ForbiddenException('You can only accept invitations sent to you');
    }
    
    if (collaboration.status !== 'PENDING') {
      throw new ForbiddenException('This invitation cannot be accepted');
    }
    
    return this.prisma.imageCollaboration.update({
      where: { id: collaborationId },
      data: { status: 'ACCEPTED' },
      include: {
        inviter: true,
        invitee: true,
        image: {
          include: {
            examen: {
              include: {
                patient: true,
                typeExamen: true,
              },
            },
          },
        },
      },
    });
  }

  async rejectCollaboration(collaborationId: string, inviteeID: string) {
    const collaboration = await this.prisma.imageCollaboration.findUnique({
      where: { id: collaborationId },
    });
    
    if (!collaboration) {
      throw new NotFoundException('Collaboration not found');
    }
    
    if (collaboration.inviteeID !== inviteeID) {
      throw new ForbiddenException('You can only reject invitations sent to you');
    }
    
    if (collaboration.status !== 'PENDING') {
      throw new ForbiddenException('This invitation cannot be rejected');
    }
    
    return this.prisma.imageCollaboration.update({
      where: { id: collaborationId },
      data: { status: 'REJECTED' },
      include: {
        inviter: true,
        invitee: true,
        image: {
          include: {
            examen: {
              include: {
                patient: true,
                typeExamen: true,
              },
            },
          },
        },
      },
    });
  }

  async listCollaborators(imageID: string) {
    const collaborations = await this.prisma.imageCollaboration.findMany({
      where: { 
        imageID,
        status: 'ACCEPTED'
      },
      include: {
        invitee: true,
      },
    });
    return collaborations.map((c) => c.invitee);
  }

  async sendMessage(imageID: string, senderID: string, content: string) {
    // Check if sender is an accepted collaborator on this image
    const collaborations = await this.prisma.imageCollaboration.findMany({
      where: { 
        imageID,
        status: 'ACCEPTED'
      },
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
      include: {
        sender: true,
      },
    });
  }

  async getMessages(imageID: string) {
    return this.prisma.chatMessage.findMany({
      where: { imageID },
      orderBy: { timestamp: 'asc' },
      include: {
        sender: true,
        image: {
          include: {
            examen: {
              include: {
                patient: true,
                typeExamen: true,
                demandePar: true,
              },
            },
          },
        },
      },
    });
  }

  async getUserCollaborations(userID: string) {
    return this.prisma.imageCollaboration.findMany({
      where: {
        OR: [
          { inviterID: userID },
          { inviteeID: userID },
        ],
        status: 'ACCEPTED',
      },
      include: {
        image: {
          include: {
            examen: {
              include: {
                patient: true,
                typeExamen: true,
                demandePar: true,
              },
            },
          },
        },
        inviter: true,
        invitee: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getPendingCollaborations(userID: string) {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    return this.prisma.imageCollaboration.findMany({
      where: {
        inviteeID: userID,
        status: 'PENDING',
        createdAt: {
          gte: twentyFourHoursAgo,
        },
      },
      include: {
        image: {
          include: {
            examen: {
              include: {
                patient: true,
                typeExamen: true,
                demandePar: true,
              },
            },
          },
        },
        inviter: true,
        invitee: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getSentInvitations(userID: string) {
    return this.prisma.imageCollaboration.findMany({
      where: {
        inviterID: userID,
        status: 'PENDING',
      },
      include: {
        image: {
          include: {
            examen: {
              include: {
                patient: true,
                typeExamen: true,
                demandePar: true,
              },
            },
          },
        },
        inviter: true,
        invitee: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
} 