import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ImageCollaborationService } from './image-collaboration.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private jwtService;
    private collaborationService;
    server: Server;
    private logger;
    private connectedClients;
    private userImageRooms;
    private onlineUsers;
    constructor(jwtService: JwtService, collaborationService: ImageCollaborationService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleJoinImageRoom(data: {
        imageID: string;
    }, client: Socket): Promise<void>;
    handleLeaveImageRoom(data: {
        imageID: string;
    }, client: Socket): Promise<void>;
    handleSendMessage(data: {
        imageID: string;
        content: string;
    }, client: Socket): Promise<void>;
    handleTyping(data: {
        imageID: string;
        isTyping: boolean;
    }, client: Socket): Promise<void>;
    handleGetOnlineUsers(data: {
        imageID: string;
    }, client: Socket): Promise<void>;
    handlePing(client: Socket): Promise<void>;
    private getUserIdFromSocket;
    getUsersInImageRoom(imageID: string): string[];
    sendNotificationToUser(userId: string, notification: any): Promise<void>;
    broadcastToImageRoom(imageID: string, event: string, data: any): Promise<void>;
    getAllOnlineUsers(): string[];
    isUserOnline(userId: string): boolean;
}
