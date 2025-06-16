import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: {
        ...createNotificationDto,
        dateCreation: new Date(),
        estLu: false,
      },
    });
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
    return this.prisma.notification.update({
      where: { notificationID: notificationId },
      data: { estLu: true },
    });
  }

  async markAllAsRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: {
        utilisateurID: userId,
        estLu: false,
      },
      data: { estLu: true },
    });
  }

  async remove(notificationId: string) {
    return this.prisma.notification.delete({
      where: { notificationID: notificationId },
    });
  }
} 