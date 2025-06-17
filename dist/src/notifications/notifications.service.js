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
    async create(createNotificationDto) {
        const notification = await this.prisma.notification.create({
            data: {
                ...createNotificationDto,
                dateCreation: new Date(),
                estLu: false,
            },
        });
        await this.notificationsGateway.sendNotificationToUser(createNotificationDto.utilisateurID, notification);
        return notification;
    }
    async findAll(userId) {
        return this.prisma.notification.findMany({
            where: {
                utilisateurID: userId,
            },
            orderBy: {
                dateCreation: 'desc',
            },
        });
    }
    async findUnread(userId) {
        return this.prisma.notification.findMany({
            where: {
                utilisateurID: userId,
                estLu: false,
            },
            orderBy: {
                dateCreation: 'desc',
            },
        });
    }
    async markAsRead(notificationId) {
        const notification = await this.prisma.notification.update({
            where: { notificationID: notificationId },
            data: { estLu: true },
        });
        await this.notificationsGateway.sendNotificationToUser(notification.utilisateurID, { type: 'notification_read', notificationId });
        return notification;
    }
    async markAllAsRead(userId) {
        const result = await this.prisma.notification.updateMany({
            where: {
                utilisateurID: userId,
                estLu: false,
            },
            data: { estLu: true },
        });
        await this.notificationsGateway.sendNotificationToUser(userId, {
            type: 'all_notifications_read',
        });
        return result;
    }
    async remove(notificationId) {
        return this.prisma.notification.delete({
            where: { notificationID: notificationId },
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