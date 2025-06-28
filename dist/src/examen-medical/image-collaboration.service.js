"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ImageCollaborationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageCollaborationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ImageCollaborationService = ImageCollaborationService_1 = class ImageCollaborationService {
    prisma;
    logger = new common_1.Logger(ImageCollaborationService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async inviteRadiologistToImage(imageID, inviterID, inviteeID) {
        if (!inviteeID) {
            this.logger.error('inviteeID is undefined or empty');
            throw new common_1.NotFoundException('Invitee ID is required');
        }
        this.logger.log(`Inviting radiologist - imageID: ${imageID}, inviterID: ${inviterID}, inviteeID: ${inviteeID}`);
        if (inviterID === inviteeID) {
            this.logger.warn(`Inviter ${inviterID} cannot invite themselves`);
            throw new common_1.ForbiddenException('You cannot invite yourself');
        }
        const invitee = await this.prisma.utilisateur.findUnique({
            where: { utilisateurID: inviteeID },
        });
        if (!invitee) {
            this.logger.error(`Invitee not found with ID: ${inviteeID}`);
            throw new common_1.NotFoundException('Invited user not found');
        }
        if (invitee.role !== 'RADIOLOGUE') {
            this.logger.warn(`Invitee ${inviteeID} is not a radiologist (role: ${invitee.role})`);
            throw new common_1.ForbiddenException('You can only invite radiologists');
        }
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
            throw new common_1.NotFoundException('Image not found');
        }
        this.logger.log(`Image details - imageID: ${image.imageID}, sopInstanceUID: ${image.sopInstanceUID}`);
        const isExamRequester = image.examen.demandeParID === inviterID;
        const isAssignedRadiologist = image.examen.radiologues.some(r => r.utilisateurID === inviterID);
        const isCollaborator = image.collaborations.some((c) => c.inviterID === inviterID || c.inviteeID === inviterID);
        this.logger.log(`Access check - isExamRequester: ${isExamRequester}, isAssignedRadiologist: ${isAssignedRadiologist}, isCollaborator: ${isCollaborator}`);
        if (!isExamRequester && !isAssignedRadiologist && !isCollaborator) {
            this.logger.warn(`Inviter ${inviterID} does not have access to image ${imageID}`);
            throw new common_1.ForbiddenException('You do not have permission to invite collaborators on this image');
        }
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
                throw new common_1.ForbiddenException('This radiologist is already a collaborator on this image');
            }
            else {
                this.logger.warn(`Pending invitation already exists for radiologist ${inviteeID} on image ${imageID}`);
                throw new common_1.ForbiddenException('An invitation is already pending for this radiologist');
            }
        }
        this.logger.log(`Creating new collaboration invitation`);
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
    async acceptCollaboration(collaborationId, inviteeID) {
        const collaboration = await this.prisma.imageCollaboration.findUnique({
            where: { id: collaborationId },
        });
        if (!collaboration) {
            throw new common_1.NotFoundException('Collaboration not found');
        }
        if (collaboration.inviteeID !== inviteeID) {
            throw new common_1.ForbiddenException('You can only accept invitations sent to you');
        }
        if (collaboration.status !== 'PENDING') {
            throw new common_1.ForbiddenException('This invitation cannot be accepted');
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
    async rejectCollaboration(collaborationId, inviteeID) {
        const collaboration = await this.prisma.imageCollaboration.findUnique({
            where: { id: collaborationId },
        });
        if (!collaboration) {
            throw new common_1.NotFoundException('Collaboration not found');
        }
        if (collaboration.inviteeID !== inviteeID) {
            throw new common_1.ForbiddenException('You can only reject invitations sent to you');
        }
        if (collaboration.status !== 'PENDING') {
            throw new common_1.ForbiddenException('This invitation cannot be rejected');
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
    async listCollaborators(imageID) {
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
            throw new common_1.NotFoundException('Image not found');
        }
        const collaborators = new Map();
        collaborators.set(image.examen.demandePar.utilisateurID, {
            utilisateurID: image.examen.demandePar.utilisateurID,
            nom: image.examen.demandePar.nom,
            prenom: image.examen.demandePar.prenom,
            email: image.examen.demandePar.email,
            role: 'Exam Requester',
        });
        image.examen.radiologues.forEach(radiologist => {
            collaborators.set(radiologist.utilisateurID, {
                utilisateurID: radiologist.utilisateurID,
                nom: radiologist.nom,
                prenom: radiologist.prenom,
                email: radiologist.email,
                role: 'Assigned Radiologist',
            });
        });
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
    async sendMessage(imageID, senderID, content) {
        const collaborations = await this.prisma.imageCollaboration.findMany({
            where: {
                imageID,
                status: 'ACCEPTED'
            },
        });
        const isCollaborator = collaborations.some((c) => c.inviterID === senderID || c.inviteeID === senderID);
        if (!isCollaborator)
            throw new common_1.ForbiddenException('You are not a collaborator on this image');
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
    async getMessages(imageID) {
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
    async getUserCollaborations(userID) {
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
    async getPendingCollaborations(userID) {
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
    async getPendingCollaborationsForImage(imageID, userID) {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        console.log("heremdr : " + userID + " " + imageID);
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
    async getSentInvitations(userID) {
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
    async getSentInvitationsForImage(imageID, userID) {
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
    async findImageBySopInstanceUID(sopInstanceUID) {
        this.logger.log(`Searching for image by SOP Instance UID: ${sopInstanceUID}`);
        const image = await this.prisma.imageMedicale.findFirst({
            where: { sopInstanceUID },
        });
        this.logger.log(`Database query result: ${image ? 'Image found' : 'Image not found'}`);
        if (image) {
            this.logger.log(`Found image - imageID: ${image.imageID}, sopInstanceUID: ${image.sopInstanceUID}`);
        }
        else {
            this.logger.warn(`No image found with SOP Instance UID: ${sopInstanceUID}`);
        }
        if (!image) {
            throw new common_1.NotFoundException(`Image with SOP Instance UID ${sopInstanceUID} not found`);
        }
        return image;
    }
};
exports.ImageCollaborationService = ImageCollaborationService;
exports.ImageCollaborationService = ImageCollaborationService = ImageCollaborationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ImageCollaborationService);
//# sourceMappingURL=image-collaboration.service.js.map