import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
export declare class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private jwtService;
    server: Server;
    private logger;
    private connectedClients;
    constructor(jwtService: JwtService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    sendNotificationToUser(userId: string, notification: any): Promise<void>;
    broadcastNotification(notification: any): Promise<void>;
    sendNotificationToGroup(userIds: string[], notification: any): Promise<void>;
}
