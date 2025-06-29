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
exports.NotificationsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let NotificationsGateway = class NotificationsGateway {
    jwtService;
    server;
    logger = new common_1.Logger('NotificationsGateway');
    connectedClients = new Map();
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async handleConnection(client) {
        try {
            const token = client.handshake.auth.token;
            if (!token) {
                throw new common_1.UnauthorizedException('Token manquant');
            }
            const payload = await this.jwtService.verifyAsync(token);
            const userId = payload.sub;
            if (!userId) {
                throw new common_1.UnauthorizedException('Token invalide');
            }
            this.connectedClients.set(userId, client);
            this.logger.log(`User ${userId} connected with socket id ${client.id}`);
        }
        catch (error) {
            this.logger.error(`Connection failed: ${error.message}`);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        for (const [userId, socket] of this.connectedClients.entries()) {
            if (socket.id === client.id) {
                this.connectedClients.delete(userId);
                this.logger.log(`User ${userId} disconnected`);
                break;
            }
        }
    }
    async sendNotificationToUser(userId, notification) {
        const client = this.connectedClients.get(userId);
        if (client) {
            if (notification.type === 'notification_read') {
                client.emit('notification_read', { notificationId: notification.notificationId });
            }
            else if (notification.type === 'all_notifications_read') {
                client.emit('all_notifications_read');
            }
            else {
                client.emit('notification', notification);
            }
        }
    }
    async broadcastNotification(notification) {
        this.server.emit('notification', notification);
    }
    async sendNotificationToGroup(userIds, notification) {
        userIds.forEach(userId => {
            this.sendNotificationToUser(userId, notification);
        });
    }
};
exports.NotificationsGateway = NotificationsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationsGateway.prototype, "server", void 0);
exports.NotificationsGateway = NotificationsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], NotificationsGateway);
//# sourceMappingURL=notifications.gateway.js.map