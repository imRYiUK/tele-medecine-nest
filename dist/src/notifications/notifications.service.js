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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_gateway_1 = require("./notifications.gateway");
let NotificationsService = class NotificationsService {
    prisma;
    notificationsGateway;
    constructor(prisma, notificationsGateway) {
        this.prisma = prisma;
        this.notificationsGateway = notificationsGateway;
    }
    async create(createNotificationDto, createdByID) {
        const filteredDestinataires = createNotificationDto.destinataires.filter(destinataire => String(destinataire).trim() !== String(createdByID).trim());
        if (filteredDestinataires.length === 0) {
            return null;
        }
        const notification = await this.prisma.notification.create({
            data: {
                titre: createNotificationDto.titre,
                message: createNotificationDto.message,
                type: createNotificationDto.type,
                lien: createNotificationDto.lien,
                dateCreation: new Date(),
                createdByID: createdByID,
            },
        });
        const recipients = await Promise.all(filteredDestinataires.map(async (utilisateurID) => {
            return this.prisma.notificationRecipient.create({
                data: {
                    notificationID: notification.notificationID,
                    utilisateurID: utilisateurID,
                    estLu: false,
                },
            });
        }));
        await Promise.all(filteredDestinataires.map(async (utilisateurID) => {
            await this.notificationsGateway.sendNotificationToUser(utilisateurID, {
                ...notification,
                estLu: false,
                utilisateurID: utilisateurID,
            });
        }));
        return {
            ...notification,
            recipients: recipients,
        };
    }
    async findAll(userId) {
        return this.prisma.notificationRecipient.findMany({
            where: {
                utilisateurID: userId,
            },
            include: {
                notification: {
                    include: {
                        createdBy: {
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
            orderBy: {
                notification: {
                    dateCreation: 'desc',
                },
            },
        });
    }
    async findUnread(userId) {
        return this.prisma.notificationRecipient.findMany({
            where: {
                utilisateurID: userId,
                estLu: false,
            },
            include: {
                notification: {
                    include: {
                        createdBy: {
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
            orderBy: {
                notification: {
                    dateCreation: 'desc',
                },
            },
        });
    }
    async verifyNotificationOwnership(notificationId, userId) {
        const notificationRecipient = await this.prisma.notificationRecipient.findFirst({
            where: {
                notificationID: notificationId,
                utilisateurID: userId,
            },
        });
        if (!notificationRecipient) {
            throw new common_1.NotFoundException('Notification not found or access denied');
        }
        return notificationRecipient;
    }
    async markAsRead(notificationId, userId) {
        await this.verifyNotificationOwnership(notificationId, userId);
        const updatedRecipient = await this.prisma.notificationRecipient.update({
            where: {
                notificationID_utilisateurID: {
                    notificationID: notificationId,
                    utilisateurID: userId,
                }
            },
            data: {
                estLu: true,
                dateLecture: new Date(),
            },
        });
        await this.notificationsGateway.sendNotificationToUser(userId, { type: 'notification_read', notificationId });
        return updatedRecipient;
    }
    async markAllAsRead(userId) {
        const result = await this.prisma.notificationRecipient.updateMany({
            where: {
                utilisateurID: userId,
                estLu: false,
            },
            data: {
                estLu: true,
                dateLecture: new Date(),
            },
        });
        await this.notificationsGateway.sendNotificationToUser(userId, {
            type: 'all_notifications_read',
        });
        return result;
    }
    async remove(notificationId, userId) {
        await this.verifyNotificationOwnership(notificationId, userId);
        return this.prisma.notificationRecipient.delete({
            where: {
                notificationID_utilisateurID: {
                    notificationID: notificationId,
                    utilisateurID: userId,
                }
            },
        });
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_gateway_1.NotificationsGateway])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map