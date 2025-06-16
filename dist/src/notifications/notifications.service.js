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
let NotificationsService = class NotificationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createNotificationDto) {
        return this.prisma.notification.create({
            data: {
                ...createNotificationDto,
                dateCreation: new Date(),
                estLu: false,
            },
        });
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
        return this.prisma.notification.update({
            where: { notificationID: notificationId },
            data: { estLu: true },
        });
    }
    async markAllAsRead(userId) {
        return this.prisma.notification.updateMany({
            where: {
                utilisateurID: userId,
                estLu: false,
            },
            data: { estLu: true },
        });
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
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map