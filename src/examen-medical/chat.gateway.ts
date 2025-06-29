import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ImageCollaborationService } from './image-collaboration.service';

interface ChatMessage {
  imageID: string;
  content: string;
  senderID: string;
  timestamp: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');
  private connectedClients: Map<string, Socket> = new Map(); // userId -> socket
  private userImageRooms: Map<string, Set<string>> = new Map(); // userId -> Set of imageIDs
  private onlineUsers: Map<string, { userId: string; lastSeen: Date }> = new Map(); // socketId -> user info

  constructor(
    private jwtService: JwtService,
    private collaborationService: ImageCollaborationService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      // Get token from handshake
      const token = client.handshake.auth.token;
      if (!token) {
        throw new UnauthorizedException('Token manquant');
      }

      // Verify and decode token
      const payload = await this.jwtService.verifyAsync(token);
      const userId = payload.sub;

      if (!userId) {
        throw new UnauthorizedException('Token invalide');
      }

      // Store connection with userId
      this.connectedClients.set(userId, client);
      this.userImageRooms.set(userId, new Set());
      this.onlineUsers.set(client.id, { userId, lastSeen: new Date() });
      
      this.logger.log(`User ${userId} connected to chat with socket id ${client.id}`);
      
      // Send connection confirmation
      client.emit('connected', { userId, timestamp: new Date().toISOString() });
    } catch (error) {
      this.logger.error(`Chat connection failed: ${error.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    // Find userId associated with this socket and remove it
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

  @SubscribeMessage('joinImageRoom')
  async handleJoinImageRoom(
    @MessageBody() data: { imageID: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const userId = this.getUserIdFromSocket(client);
      if (!userId) return;

      const imageID = data.imageID;
      
      // Verify user has access to this image (is a collaborator)
      const collaborators = await this.collaborationService.listCollaborators(imageID);
      const isCollaborator = collaborators.some(
        (c) => c.utilisateurID === userId
      );

      if (!isCollaborator) {
        client.emit('error', { message: 'Access denied to this image' });
        return;
      }

      // Join the room for this image
      await client.join(`image:${imageID}`);
      
      // Track user's image rooms
      const userRooms = this.userImageRooms.get(userId) || new Set();
      userRooms.add(imageID);
      this.userImageRooms.set(userId, userRooms);

      this.logger.log(`User ${userId} joined image room ${imageID}`);
      client.emit('joinedImageRoom', { imageID });
      
      // Notify other users in the room
      client.to(`image:${imageID}`).emit('userJoinedRoom', { 
        userId, 
        imageID,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      this.logger.error(`Error joining image room: ${error.message}`);
      client.emit('error', { message: 'Failed to join image room' });
    }
  }

  @SubscribeMessage('leaveImageRoom')
  async handleLeaveImageRoom(
    @MessageBody() data: { imageID: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const userId = this.getUserIdFromSocket(client);
      if (!userId) return;

      const imageID = data.imageID;
      
      // Leave the room
      await client.leave(`image:${imageID}`);
      
      // Remove from user's tracked rooms
      const userRooms = this.userImageRooms.get(userId);
      if (userRooms) {
        userRooms.delete(imageID);
      }

      this.logger.log(`User ${userId} left image room ${imageID}`);
      client.emit('leftImageRoom', { imageID });
      
      // Notify other users in the room
      client.to(`image:${imageID}`).emit('userLeftRoom', { 
        userId, 
        imageID,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      this.logger.error(`Error leaving image room: ${error.message}`);
    }
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() data: { imageID: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const userId = this.getUserIdFromSocket(client);
      if (!userId) return;

      const { imageID, content } = data;

      // Validate message content
      if (!content || content.trim().length === 0) {
        client.emit('error', { message: 'Message cannot be empty' });
        return;
      }

      if (content.length > 1000) {
        client.emit('error', { message: 'Message too long (max 1000 characters)' });
        return;
      }

      // Save message to database
      const savedMessage = await this.collaborationService.sendMessage(
        imageID,
        userId,
        content.trim(),
      );

      // Broadcast message to all users in the image room
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
      
      // Send acknowledgment to sender
      client.emit('messageSent', { 
        messageID: savedMessage.messageID,
        timestamp: new Date().toISOString()
      });
      
      this.logger.log(`Message sent by user ${userId} in image ${imageID}`);
    } catch (error) {
      this.logger.error(`Error sending message: ${error.message}`);
      client.emit('error', { message: 'Failed to send message' });
    }
  }

  @SubscribeMessage('typing')
  async handleTyping(
    @MessageBody() data: { imageID: string; isTyping: boolean },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const userId = this.getUserIdFromSocket(client);
      if (!userId) return;

      const { imageID, isTyping } = data;

      // Broadcast typing status to other users in the room
      client.to(`image:${imageID}`).emit('userTyping', {
        userId,
        imageID,
        isTyping,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      this.logger.error(`Error handling typing: ${error.message}`);
    }
  }

  @SubscribeMessage('getOnlineUsers')
  async handleGetOnlineUsers(
    @MessageBody() data: { imageID: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const userId = this.getUserIdFromSocket(client);
      if (!userId) return;

      const { imageID } = data;
      const onlineUsers = this.getUsersInImageRoom(imageID);
      
      client.emit('onlineUsers', {
        imageID,
        users: onlineUsers,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      this.logger.error(`Error getting online users: ${error.message}`);
    }
  }

  @SubscribeMessage('ping')
  async handlePing(
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const userId = this.getUserIdFromSocket(client);
      if (!userId) return;

      // Update last seen
      const userInfo = this.onlineUsers.get(client.id);
      if (userInfo) {
        userInfo.lastSeen = new Date();
        this.onlineUsers.set(client.id, userInfo);
      }

      client.emit('pong', { timestamp: new Date().toISOString() });
    } catch (error) {
      this.logger.error(`Error handling ping: ${error.message}`);
    }
  }

  private getUserIdFromSocket(client: Socket): string | null {
    for (const [userId, socket] of this.connectedClients.entries()) {
      if (socket.id === client.id) {
        return userId;
      }
    }
    return null;
  }

  // Method to get all users currently viewing an image
  getUsersInImageRoom(imageID: string): string[] {
    const users: string[] = [];
    for (const [userId, userRooms] of this.userImageRooms.entries()) {
      if (userRooms.has(imageID)) {
        users.push(userId);
      }
    }
    return users;
  }

  // Method to send notification to specific user
  async sendNotificationToUser(userId: string, notification: any) {
    const client = this.connectedClients.get(userId);
    if (client) {
      client.emit('notification', notification);
    }
  }

  // Method to broadcast to all users in an image room
  async broadcastToImageRoom(imageID: string, event: string, data: any) {
    this.server.to(`image:${imageID}`).emit(event, data);
  }

  // Method to get all online users
  getAllOnlineUsers(): string[] {
    return Array.from(this.connectedClients.keys());
  }

  // Method to check if user is online
  isUserOnline(userId: string): boolean {
    return this.connectedClients.has(userId);
  }
} 