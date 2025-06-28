import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto, @Request() req: any) {
    // Only allow admins to create notifications for other users
    // Or allow users to create notifications for themselves
    const isAdmin = req.user.role === 'ADMINISTRATEUR' || req.user.role === 'SUPER_ADMIN';
    const isCreatingForSelf = createNotificationDto.destinataires.length === 1 && 
                              createNotificationDto.destinataires[0] === req.user.userId;
    
    if (!isAdmin && !isCreatingForSelf) {
      throw new HttpException('Unauthorized: You can only create notifications for yourself', HttpStatus.FORBIDDEN);
    }
    
    return this.notificationsService.create(createNotificationDto, req.user.userId);
  }

  @Post('test')
  async createTestNotification(@Request() req: any) {
    const testNotification: CreateNotificationDto = {
      destinataires: [req.user.userId],
      titre: 'Test Notification',
      message: 'Ceci est une notification de test pour vérifier le système de notifications en temps réel.',
      type: 'system',
      lien: undefined,
    };
    return this.notificationsService.create(testNotification, req.user.userId);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.notificationsService.findAll(req.user.userId);
  }

  @Get('unread')
  findUnread(@Request() req: any) {
    return this.notificationsService.findUnread(req.user.userId);
  }

  @Post(':id/read')
  async markAsRead(@Param('id') id: string, @Request() req: any) {
    try {
      return await this.notificationsService.markAsRead(id, req.user.userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('read-all')
  markAllAsRead(@Request() req: any) {
    return this.notificationsService.markAllAsRead(req.user.userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: any) {
    try {
      return await this.notificationsService.remove(id, req.user.userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('test-chat-notification')
  @ApiOperation({ summary: 'Test chat notification system' })
  @ApiResponse({ status: 201, description: 'Test notification created' })
  async testChatNotification(@Request() req: any, @Body() body: { imageID: string, message: string }) {
    const { imageID, message } = body;
    const senderID = req.user.utilisateurID;
    
    // Test the same logic as in ImageCollaborationService
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
      throw new NotFoundException('Image not found');
    }

    // Get all collaborators
    const collaborators = new Map();

    // Add the exam requester
    collaborators.set(image.examen.demandePar.utilisateurID, {
      utilisateurID: image.examen.demandePar.utilisateurID,
      nom: image.examen.demandePar.nom,
      prenom: image.examen.demandePar.prenom,
      email: image.examen.demandePar.email,
      role: 'Exam Requester',
    });

    // Add assigned radiologists
    image.examen.radiologues.forEach(radiologist => {
      collaborators.set(radiologist.utilisateurID, {
        utilisateurID: radiologist.utilisateurID,
        nom: radiologist.nom,
        prenom: radiologist.prenom,
        email: radiologist.email,
        role: 'Assigned Radiologist',
      });
    });

    // Add accepted collaborators
    image.collaborations.forEach(collaboration => {
      // We need to get the invitee data separately since it's not included in the query
      // For now, we'll use the inviteeID and get the user data
      collaborators.set(collaboration.inviteeID, {
        utilisateurID: collaboration.inviteeID,
        nom: 'Unknown', // We'll need to fetch this separately
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

    const notificationsSent: Array<{recipient: any, reason: string}> = [];
    const notificationsSkipped: Array<{recipient: any, reason: string}> = [];

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
      } else {
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
} 