import { Injectable, NotFoundException, ForbiddenException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ImageCollaborationService {
  private readonly logger = new Logger(ImageCollaborationService.name);

  constructor(private readonly prisma: PrismaService) {}

  async inviteRadiologistToImage(imageID: string, inviterID: string, inviteeID: string) {
    if (!inviteeID) {
      this.logger.error('inviteeID is undefined or empty');
      throw new NotFoundException('Invitee ID is required');
    }
    this.logger.log(`Inviting radiologist - imageID: ${imageID}, inviterID: ${inviterID}, inviteeID: ${inviteeID}`);
    
    // Check if inviter and invitee are the same person
    if (inviterID === inviteeID) {
      this.logger.warn(`Inviter ${inviterID} cannot invite themselves`);
      throw new ForbiddenException('You cannot invite yourself');
    }
    
    // Check if invitee exists and is a radiologist
    const invitee = await this.prisma.utilisateur.findUnique({
      where: { utilisateurID: inviteeID },
    });
    
    if (!invitee) {
      this.logger.error(`Invitee not found with ID: ${inviteeID}`);
      throw new NotFoundException('Invited user not found');
    }
    
    if (invitee.role !== 'RADIOLOGUE') {
      this.logger.warn(`Invitee ${inviteeID} is not a radiologist (role: ${invitee.role})`);
      throw new ForbiddenException('You can only invite radiologists');
    }
    
    // Check if image exists and get its details
    const image = await this.prisma.imageMedicale.findUnique({
      where: { imageID },
      include: {
        examen: {
          include: {
            demandePar: true,
            radiologues: true,
          },
        },
        collaborations: {
          where: {
            status: {
              in: ['ACCEPTED']
            }
          }
        },
      },
    });
    
    this.logger.log(`Image lookup result: ${image ? 'Image found' : 'Image not found'}`);
    
    if (!image) {
      this.logger.error(`Image not found with imageID: ${imageID}`);
      throw new NotFoundException('Image not found');
    }
    
    this.logger.log(`Image details - imageID: ${image.imageID}, sopInstanceUID: ${image.sopInstanceUID}`);
    
    // Check if inviter has access to this image
    // They can invite if they are:
    // 1. The person who requested the exam
    // 2. A radiologist assigned to the exam
    // 3. An accepted collaborator on the image
    const isExamRequester = image.examen.demandeParID === inviterID;
    const isAssignedRadiologist = image.examen.radiologues.some(r => r.utilisateurID === inviterID);
    const isCollaborator = image.collaborations.some(
      (c) => c.inviterID === inviterID || c.inviteeID === inviterID
    );
    
    this.logger.log(`Access check - isExamRequester: ${isExamRequester}, isAssignedRadiologist: ${isAssignedRadiologist}, isCollaborator: ${isCollaborator}`);
    
    if (!isExamRequester && !isAssignedRadiologist && !isCollaborator) {
      this.logger.warn(`Inviter ${inviterID} does not have access to image ${imageID}`);
      throw new ForbiddenException('You do not have permission to invite collaborators on this image');
    }
    
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
    
    this.logger.log(`Existing collaboration check: ${existingCollaboration ? 'Found existing' : 'No existing'}`);
    
    if (existingCollaboration) {
      if (existingCollaboration.status === 'ACCEPTED') {
        this.logger.warn(`Radiologist ${inviteeID} is already a collaborator on image ${imageID}`);
        throw new ForbiddenException('This radiologist is already a collaborator on this image');
      } else {
        this.logger.warn(`Pending invitation already exists for radiologist ${inviteeID} on image ${imageID}`);
        throw new ForbiddenException('An invitation is already pending for this radiologist');
      }
    }
    
    this.logger.log(`Creating new collaboration invitation`);
    
    // Create collaboration with PENDING status
    const result = await this.prisma.imageCollaboration.create({
      data: {
        imageID,
        inviterID,
        inviteeID,
        status: 'PENDING',
      },
      include: {
        inviter: {
          select: {
            utilisateurID: true,
            nom: true,
            prenom: true,
            email: true,
          },
        },
        invitee: {
          select: {
            utilisateurID: true,
            nom: true,
            prenom: true,
            email: true,
          },
        },
        image: {
          include: {
            examen: {
              include: {
                patient: {
                  select: {
                    nom: true,
                    prenom: true,
                  },
                },
                typeExamen: {
                  select: {
                    nomType: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    
    this.logger.log(`Collaboration invitation created successfully - collaborationID: ${result.id}`);
    return result;
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
    // Get the image with exam details
    const image = await this.prisma.imageMedicale.findUnique({
      where: { imageID },
      include: {
        examen: {
          include: {
            demandePar: true,
            radiologues: true,
          },
        },
        collaborations: {
          where: {
            status: 'ACCEPTED'
          },
          include: {
            invitee: {
              select: {
                utilisateurID: true,
                nom: true,
                prenom: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!image) {
      throw new NotFoundException('Image not found');
    }

    // Create a set to avoid duplicates
    const collaborators = new Map();

    // Add the exam requester (original owner)
    collaborators.set(image.examen.demandePar.utilisateurID, {
      utilisateurID: image.examen.demandePar.utilisateurID,
      nom: image.examen.demandePar.nom,
      prenom: image.examen.demandePar.prenom,
      email: image.examen.demandePar.email,
      role: 'Exam Requester',
    });

    // Add assigned radiologists
    image.examen.radiologues.forEach(radiologist => {
      collaborators.set(radiologist.utilisateurID, {
        utilisateurID: radiologist.utilisateurID,
        nom: radiologist.nom,
        prenom: radiologist.prenom,
        email: radiologist.email,
        role: 'Assigned Radiologist',
      });
    });

    // Add accepted collaborators
    image.collaborations.forEach(collaboration => {
      collaborators.set(collaboration.invitee.utilisateurID, {
        utilisateurID: collaboration.invitee.utilisateurID,
        nom: collaboration.invitee.nom,
        prenom: collaboration.invitee.prenom,
        email: collaboration.invitee.email,
        role: 'Collaborator',
      });
    });

    return Array.from(collaborators.values());
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
    console.log('getUserCollaborations' + userID);
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
    console.log('getPendingCollaborations', userID);
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

  async getPendingCollaborationsForImage(imageID: string, userID: string) {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    console.log("heremdr : " + userID + " " + imageID)
    return this.prisma.imageCollaboration.findMany({
      where: {
        imageID,
        inviterID: userID,
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

  async getAllPendingCollaborationsForImage(imageID: string) {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    return this.prisma.imageCollaboration.findMany({
      where: {
        imageID,
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
    console.log('getSentInvitations', userID);
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

  async getSentInvitationsForImage(imageID: string, userID: string) {
    console.log('getSentInvitationsForImage', userID, imageID);
    return this.prisma.imageCollaboration.findMany({
      where: {
        imageID,
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

  async findImageBySopInstanceUID(sopInstanceUID: string) {
    this.logger.log(`Searching for image by SOP Instance UID: ${sopInstanceUID}`);
    
    const image = await this.prisma.imageMedicale.findFirst({
      where: { sopInstanceUID },
    });

    this.logger.log(`Database query result: ${image ? 'Image found' : 'Image not found'}`);
    
    if (image) {
      this.logger.log(`Found image - imageID: ${image.imageID}, sopInstanceUID: ${image.sopInstanceUID}`);
    } else {
      this.logger.warn(`No image found with SOP Instance UID: ${sopInstanceUID}`);
    }

    if (!image) {
      throw new NotFoundException(`Image with SOP Instance UID ${sopInstanceUID} not found`);
    }

    return image;
  }
} 