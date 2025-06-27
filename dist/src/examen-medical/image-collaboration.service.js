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
                collaborations: true,
            },
        });
        if (!image)
            throw new common_1.NotFoundException('Image not found');
        const isCollaborator = image.collaborations.some((c) => c.inviterID === inviterID || c.inviteeID === inviterID);
        if (!isCollaborator)
            throw new common_1.ForbiddenException('You do not have access to invite on this image');
        const alreadyInvited = image.collaborations.some((c) => c.inviteeID === inviteeID);
        if (alreadyInvited)
            throw new common_1.ForbiddenException('This radiologist is already a collaborator');
        return this.prisma.imageCollaboration.create({
            data: {
                imageID,
                inviterID,
                inviteeID,
            },
        });
    }
    async listCollaborators(imageID) {
        const collaborations = await this.prisma.imageCollaboration.findMany({
            where: { imageID },
            include: {
                invitee: true,
            },
        });
        return collaborations.map((c) => c.invitee);
    }
    async sendMessage(imageID, senderID, content) {
        const collaborations = await this.prisma.imageCollaboration.findMany({
            where: { imageID },
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
};
exports.ImageCollaborationService = ImageCollaborationService;
exports.ImageCollaborationService = ImageCollaborationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ImageCollaborationService);
//# sourceMappingURL=image-collaboration.service.js.map