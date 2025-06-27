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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageCollaborationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ImageCollaborationService = class ImageCollaborationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async inviteRadiologistToImage(imageID, inviterID, inviteeID) {
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
        if (!image)
            throw new common_1.NotFoundException('Image not found');
        const isCollaborator = image.collaborations.some((c) => c.inviterID === inviterID || c.inviteeID === inviterID);
        if (!isCollaborator)
            throw new common_1.ForbiddenException('You do not have access to invite on this image');
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
                throw new common_1.ForbiddenException('This radiologist is already a collaborator');
            }
            else {
                throw new common_1.ForbiddenException('An invitation is already pending for this radiologist');
            }
        }
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
    async getSentInvitations(userID) {
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
};
exports.ImageCollaborationService = ImageCollaborationService;
exports.ImageCollaborationService = ImageCollaborationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ImageCollaborationService);
//# sourceMappingURL=image-collaboration.service.js.map