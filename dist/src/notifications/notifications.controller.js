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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsController = void 0;
const common_1 = require("@nestjs/common");
const notifications_service_1 = require("./notifications.service");
const create_notification_dto_1 = require("./dto/create-notification.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const prisma_service_1 = require("../prisma/prisma.service");
let NotificationsController = class NotificationsController {
    notificationsService;
    prisma;
    constructor(notificationsService, prisma) {
        this.notificationsService = notificationsService;
        this.prisma = prisma;
    }
    getUserId(req) {
        if (!req.user || !req.user['utilisateurID']) {
            throw new common_1.UnauthorizedException('Utilisateur non authentifié');
        }
        return req.user['utilisateurID'];
    }
    create(createNotificationDto, req) {
        const userId = this.getUserId(req);
        const isAdmin = req.user.role === 'ADMINISTRATEUR' || req.user.role === 'SUPER_ADMIN';
        const isCreatingForSelf = createNotificationDto.destinataires.length === 1 &&
            createNotificationDto.destinataires[0] === userId;
        if (!isAdmin && !isCreatingForSelf) {
            throw new common_1.HttpException('Unauthorized: You can only create notifications for yourself', common_1.HttpStatus.FORBIDDEN);
        }
        return this.notificationsService.create(createNotificationDto, userId);
    }
    async createTestNotification(req) {
        const userId = this.getUserId(req);
        const testNotification = {
            destinataires: [userId],
            titre: 'Test Notification',
            message: 'Ceci est une notification de test pour vérifier le système de notifications en temps réel.',
            type: 'system',
            lien: undefined,
        };
        return this.notificationsService.create(testNotification, userId);
    }
    findAll(req) {
        const userId = this.getUserId(req);
        return this.notificationsService.findAll(userId);
    }
    findUnread(req) {
        const userId = this.getUserId(req);
        return this.notificationsService.findUnread(userId);
    }
    async markAsRead(id, req) {
        const userId = this.getUserId(req);
        try {
            return await this.notificationsService.markAsRead(id, userId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    markAllAsRead(req) {
        const userId = this.getUserId(req);
        return this.notificationsService.markAllAsRead(userId);
    }
    async remove(id, req) {
        const userId = this.getUserId(req);
        try {
            return await this.notificationsService.remove(id, userId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async testChatNotification(req, body) {
        const userId = this.getUserId(req);
        const { imageID, message } = body;
        const senderID = userId;
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
            collaborators.set(collaboration.inviteeID, {
                utilisateurID: collaboration.inviteeID,
                nom: 'Unknown',
                prenom: 'Unknown',
                email: 'unknown@example.com',
                role: 'Collaborator',
            });
        });
        const collaboratorsList = Array.from(collaborators.values());
        const sender = await this.prisma.utilisateur.findUnique({
            where: { utilisateurID: senderID },
            select: { nom: true, prenom: true }
        });
        const imageForLink = await this.prisma.imageMedicale.findUnique({
            where: { imageID },
            select: { sopInstanceUID: true }
        });
        const notificationsSent = [];
        const notificationsSkipped = [];
        for (const collaborator of collaboratorsList) {
            if (collaborator.utilisateurID !== senderID) {
                notificationsSent.push({
                    recipient: collaborator,
                    reason: 'Different from sender'
                });
                await this.notificationsService.create({
                    destinataires: [collaborator.utilisateurID],
                    titre: 'Test - Nouveau message',
                    message: `Test: ${message} de ${sender?.prenom} ${sender?.nom} sur l'image médicale`,
                    type: 'CHAT_MESSAGE',
                    lien: `/radiologue/dicom/image/${imageForLink?.sopInstanceUID}`,
                }, senderID);
            }
            else {
                notificationsSkipped.push({
                    recipient: collaborator,
                    reason: 'Same as sender'
                });
            }
        }
        return {
            message: 'Test notification completed',
            sender: {
                id: senderID,
                name: `${sender?.prenom} ${sender?.nom}`
            },
            totalCollaborators: collaboratorsList.length,
            notificationsSent: notificationsSent.length,
            notificationsSkipped: notificationsSkipped.length,
            details: {
                sent: notificationsSent,
                skipped: notificationsSkipped
            }
        };
    }
};
exports.NotificationsController = NotificationsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notification_dto_1.CreateNotificationDto, Object]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('test'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "createTestNotification", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('unread'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "findUnread", null);
__decorate([
    (0, common_1.Post)(':id/read'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Post)('read-all'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "markAllAsRead", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('test-chat-notification'),
    (0, swagger_1.ApiOperation)({ summary: 'Test chat notification system' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Test notification created' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "testChatNotification", null);
exports.NotificationsController = NotificationsController = __decorate([
    (0, common_1.Controller)('notifications'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService,
        prisma_service_1.PrismaService])
], NotificationsController);
//# sourceMappingURL=notifications.controller.js.map