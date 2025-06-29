import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: {
    origin: '*', // À configurer selon vos besoins de sécurité
  },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('NotificationsGateway');
  private connectedClients: Map<string, Socket> = new Map(); // userId -> socket

  constructor(private jwtService: JwtService) {}

  async handleConnection(client: Socket) {
    try {
      // Récupérer le token depuis le handshake
      const token = client.handshake.auth.token;
      if (!token) {
        throw new UnauthorizedException('Token manquant');
      }

      // Vérifier et décoder le token
      const payload = await this.jwtService.verifyAsync(token);
      const userId = payload.sub; // ou payload.userId selon votre structure de token

      if (!userId) {
        throw new UnauthorizedException('Token invalide');
      }

      // Stocker la connexion avec le userId
      this.connectedClients.set(userId, client);
      this.logger.log(`User ${userId} connected with socket id ${client.id}`);
    } catch (error) {
      this.logger.error(`Connection failed: ${error.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    // Trouver le userId associé à ce socket et le supprimer
    for (const [userId, socket] of this.connectedClients.entries()) {
      if (socket.id === client.id) {
        this.connectedClients.delete(userId);
        this.logger.log(`User ${userId} disconnected`);
        break;
      }
    }
  }

  // Méthode pour envoyer une notification à un utilisateur spécifique
  async sendNotificationToUser(userId: string, notification: any) {
    const client = this.connectedClients.get(userId);
    if (client) {
      // Si c'est un événement de statut, utiliser le type spécifique
      if (notification.type === 'notification_read') {
        client.emit('notification_read', { notificationId: notification.notificationId });
      } else if (notification.type === 'all_notifications_read') {
        client.emit('all_notifications_read');
      } else {
        // Pour les vraies notifications, utiliser l'événement 'notification'
        client.emit('notification', notification);
      }
    }
  }

  // Méthode pour envoyer une notification à tous les utilisateurs connectés
  async broadcastNotification(notification: any) {
    this.server.emit('notification', notification);
  }

  // Méthode pour envoyer une notification à un groupe d'utilisateurs
  async sendNotificationToGroup(userIds: string[], notification: any) {
    userIds.forEach(userId => {
      this.sendNotificationToUser(userId, notification);
    });
  }
} 