import { Injectable } from '@nestjs/common';
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

  async create(createNotificationDto: CreateNotificationDto) {
    const notification = await this.prisma.notification.create({
      data: {
        ...createNotificationDto,
        dateCreation: new Date(),
        estLu: false,
      },
    });

    // Envoyer la notification en temps réel via WebSocket
    await this.notificationsGateway.sendNotificationToUser(
      createNotificationDto.utilisateurID,
      notification,
    );

    return notification;
  }

  async findAll(userId: string) {
    return this.prisma.notification.findMany({
      where: {
        utilisateurID: userId,
      },
      orderBy: {
        dateCreation: 'desc',
      },
    });
  }

  async findUnread(userId: string) {
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

  async markAsRead(notificationId: string) {
    const notification = await this.prisma.notification.update({
      where: { notificationID: notificationId },
      data: { estLu: true },
    });

    // Notifier le client que la notification a été marquée comme lue
    await this.notificationsGateway.sendNotificationToUser(
      notification.utilisateurID,
      { type: 'notification_read', notificationId },
    );

    return notification;
  }

  async markAllAsRead(userId: string) {
    const result = await this.prisma.notification.updateMany({
      where: {
        utilisateurID: userId,
        estLu: false,
      },
      data: { estLu: true },
    });

    // Notifier le client que toutes les notifications ont été marquées comme lues
    await this.notificationsGateway.sendNotificationToUser(userId, {
      type: 'all_notifications_read',
    });

    return result;
  }

  async remove(notificationId: string) {
    return this.prisma.notification.delete({
      where: { notificationID: notificationId },
    });
  }
} 