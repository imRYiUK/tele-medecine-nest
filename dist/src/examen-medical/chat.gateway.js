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
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const image_collaboration_service_1 = require("./image-collaboration.service");
let ChatGateway = class ChatGateway {
    jwtService;
    collaborationService;
    server;
    logger = new common_1.Logger('ChatGateway');
    connectedClients = new Map();
    userImageRooms = new Map();
    onlineUsers = new Map();
    constructor(jwtService, collaborationService) {
        this.jwtService = jwtService;
        this.collaborationService = collaborationService;
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
            this.userImageRooms.set(userId, new Set());
            this.onlineUsers.set(client.id, { userId, lastSeen: new Date() });
            this.logger.log(`User ${userId} connected to chat with socket id ${client.id}`);
            client.emit('connected', { userId, timestamp: new Date().toISOString() });
        }
        catch (error) {
            this.logger.error(`Chat connection failed: ${error.message}`);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        for (const [userId, socket] of this.connectedClients.entries()) {
            if (socket.id === client.id) {
                this.connectedClients.delete(userId);
                this.userImageRooms.delete(userId);
                this.onlineUsers.delete(client.id);
                this.logger.log(`User ${userId} disconnected from chat`);
                break;
            }
        }
    }
    async handleJoinImageRoom(data, client) {
        try {
            const userId = this.getUserIdFromSocket(client);
            if (!userId)
                return;
            const imageID = data.imageID;
            const collaborators = await this.collaborationService.listCollaborators(imageID);
            const isCollaborator = collaborators.some((c) => c.utilisateurID === userId);
            if (!isCollaborator) {
                client.emit('error', { message: 'Access denied to this image' });
                return;
            }
            await client.join(`image:${imageID}`);
            const userRooms = this.userImageRooms.get(userId) || new Set();
            userRooms.add(imageID);
            this.userImageRooms.set(userId, userRooms);
            this.logger.log(`User ${userId} joined image room ${imageID}`);
            client.emit('joinedImageRoom', { imageID });
            client.to(`image:${imageID}`).emit('userJoinedRoom', {
                userId,
                imageID,
                timestamp: new Date().toISOString()
            });
        }
        catch (error) {
            this.logger.error(`Error joining image room: ${error.message}`);
            client.emit('error', { message: 'Failed to join image room' });
        }
    }
    async handleLeaveImageRoom(data, client) {
        try {
            const userId = this.getUserIdFromSocket(client);
            if (!userId)
                return;
            const imageID = data.imageID;
            await client.leave(`image:${imageID}`);
            const userRooms = this.userImageRooms.get(userId);
            if (userRooms) {
                userRooms.delete(imageID);
            }
            this.logger.log(`User ${userId} left image room ${imageID}`);
            client.emit('leftImageRoom', { imageID });
            client.to(`image:${imageID}`).emit('userLeftRoom', {
                userId,
                imageID,
                timestamp: new Date().toISOString()
            });
        }
        catch (error) {
            this.logger.error(`Error leaving image room: ${error.message}`);
        }
    }
    async handleSendMessage(data, client) {
        try {
            const userId = this.getUserIdFromSocket(client);
            if (!userId)
                return;
            const { imageID, content } = data;
            if (!content || content.trim().length === 0) {
                client.emit('error', { message: 'Message cannot be empty' });
                return;
            }
            if (content.length > 1000) {
                client.emit('error', { message: 'Message too long (max 1000 characters)' });
                return;
            }
            const savedMessage = await this.collaborationService.sendMessage(imageID, userId, content.trim());
            const messageData = {
                messageID: savedMessage.messageID,
                imageID: savedMessage.imageID,
                content: savedMessage.content,
                timestamp: savedMessage.timestamp,
                sender: {
                    utilisateurID: savedMessage.sender.utilisateurID,
                    nom: savedMessage.sender.nom,
                    prenom: savedMessage.sender.prenom,
                    email: savedMessage.sender.email,
                },
            };
            this.server.to(`image:${imageID}`).emit('newMessage', messageData);
            client.emit('messageSent', {
                messageID: savedMessage.messageID,
                timestamp: new Date().toISOString()
            });
            this.logger.log(`Message sent by user ${userId} in image ${imageID}`);
        }
        catch (error) {
            this.logger.error(`Error sending message: ${error.message}`);
            client.emit('error', { message: 'Failed to send message' });
        }
    }
    async handleTyping(data, client) {
        try {
            const userId = this.getUserIdFromSocket(client);
            if (!userId)
                return;
            const { imageID, isTyping } = data;
            client.to(`image:${imageID}`).emit('userTyping', {
                userId,
                imageID,
                isTyping,
                timestamp: new Date().toISOString(),
            });
        }
        catch (error) {
            this.logger.error(`Error handling typing: ${error.message}`);
        }
    }
    async handleGetOnlineUsers(data, client) {
        try {
            const userId = this.getUserIdFromSocket(client);
            if (!userId)
                return;
            const { imageID } = data;
            const onlineUsers = this.getUsersInImageRoom(imageID);
            client.emit('onlineUsers', {
                imageID,
                users: onlineUsers,
                timestamp: new Date().toISOString(),
            });
        }
        catch (error) {
            this.logger.error(`Error getting online users: ${error.message}`);
        }
    }
    async handlePing(client) {
        try {
            const userId = this.getUserIdFromSocket(client);
            if (!userId)
                return;
            const userInfo = this.onlineUsers.get(client.id);
            if (userInfo) {
                userInfo.lastSeen = new Date();
                this.onlineUsers.set(client.id, userInfo);
            }
            client.emit('pong', { timestamp: new Date().toISOString() });
        }
        catch (error) {
            this.logger.error(`Error handling ping: ${error.message}`);
        }
    }
    getUserIdFromSocket(client) {
        for (const [userId, socket] of this.connectedClients.entries()) {
            if (socket.id === client.id) {
                return userId;
            }
        }
        return null;
    }
    getUsersInImageRoom(imageID) {
        const users = [];
        for (const [userId, userRooms] of this.userImageRooms.entries()) {
            if (userRooms.has(imageID)) {
                users.push(userId);
            }
        }
        return users;
    }
    async sendNotificationToUser(userId, notification) {
        const client = this.connectedClients.get(userId);
        if (client) {
            client.emit('notification', notification);
        }
    }
    async broadcastToImageRoom(imageID, event, data) {
        this.server.to(`image:${imageID}`).emit(event, data);
    }
    getAllOnlineUsers() {
        return Array.from(this.connectedClients.keys());
    }
    isUserOnline(userId) {
        return this.connectedClients.has(userId);
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinImageRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleJoinImageRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveImageRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleLeaveImageRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typing'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleTyping", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getOnlineUsers'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleGetOnlineUsers", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('ping'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handlePing", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
        namespace: '/chat',
    }),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        image_collaboration_service_1.ImageCollaborationService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map