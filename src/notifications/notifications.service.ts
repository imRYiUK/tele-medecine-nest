import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    private prisma: PrismaService,
    private notificationsGateway: NotificationsGateway,
  ) {}

  async create(createNotificationDto: CreateNotificationDto, createdByID: string) {
    // Safety check: filter out the sender from destinataires
    const filteredDestinataires = createNotificationDto.destinataires.filter(
      destinataire => String(destinataire).trim() !== String(createdByID).trim()
    );
    
    if (filteredDestinataires.length === 0) {
      // No valid recipients, don't create notification
      return null;
    }
    
    // Create the notification
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

    // Create notification recipients for each destinataire
    const recipients = await Promise.all(
      filteredDestinataires.map(async (utilisateurID) => {
        return this.prisma.notificationRecipient.create({
          data: {
            notificationID: notification.notificationID,
            utilisateurID: utilisateurID,
            estLu: false,
          },
        });
      })
    );

    // Send WebSocket notifications to all recipients
    await Promise.all(
      filteredDestinataires.map(async (utilisateurID) => {
        await this.notificationsGateway.sendNotificationToUser(
          utilisateurID,
          {
            ...notification,
            dateCreation: notification.dateCreation.toISOString(),
            estLu: false,
            utilisateurID: utilisateurID,
          },
        );
      })
    );

    return {
      ...notification,
      recipients: recipients,
    };
  }

  async findAll(userId: string) {
    // Get all notification recipients for this user
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

  async findUnread(userId: string) {
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

  private async verifyNotificationOwnership(notificationId: string, userId: string) {
    const notificationRecipient = await this.prisma.notificationRecipient.findFirst({
      where: { 
        notificationID: notificationId,
        utilisateurID: userId,
      },
    });

    if (!notificationRecipient) {
      throw new NotFoundException('Notification not found or access denied');
    }

    return notificationRecipient;
  }

  async markAsRead(notificationId: string, userId: string) {
    // Verify the notification recipient belongs to the user
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

    // Notifier le client que la notification a été marquée comme lue
    await this.notificationsGateway.sendNotificationToUser(
      userId,
      { type: 'notification_read', notificationId },
    );

    return updatedRecipient;
  }

  async markAllAsRead(userId: string) {
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

    // Notifier le client que toutes les notifications ont été marquées comme lues
    await this.notificationsGateway.sendNotificationToUser(userId, {
      type: 'all_notifications_read',
    });

    return result;
  }

  async remove(notificationId: string, userId: string) {
    // Verify the notification recipient belongs to the user
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
} 