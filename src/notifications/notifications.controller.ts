import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, HttpException, HttpStatus, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

  private getUserId(req: any): string {
    if (!req.user || !req.user['utilisateurID']) {
      throw new UnauthorizedException('Utilisateur non authentifié');
    }
    return req.user['utilisateurID'];
  }

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto, @Request() req: any) {
    const userId = this.getUserId(req);
    
    // Only allow admins to create notifications for other users
    // Or allow users to create notifications for themselves
    const isAdmin = req.user.role === 'ADMINISTRATEUR' || req.user.role === 'SUPER_ADMIN';
    const isCreatingForSelf = createNotificationDto.destinataires.length === 1 && 
                              createNotificationDto.destinataires[0] === userId;
    
    if (!isAdmin && !isCreatingForSelf) {
      throw new HttpException('Unauthorized: You can only create notifications for yourself', HttpStatus.FORBIDDEN);
    }
    
    return this.notificationsService.create(createNotificationDto, userId);
  }

  @Post('test')
  async createTestNotification(@Request() req: any) {
    const userId = this.getUserId(req);
    const testNotification: CreateNotificationDto = {
      destinataires: [userId],
      titre: 'Test Notification',
      message: 'Ceci est une notification de test pour vérifier le système de notifications en temps réel.',
      type: 'system',
      lien: undefined,
    };
    return this.notificationsService.create(testNotification, userId);
  }

  @Get()
  findAll(@Request() req: any) {
    const userId = this.getUserId(req);
    return this.notificationsService.findAll(userId);
  }

  @Get('unread')
  findUnread(@Request() req: any) {
    const userId = this.getUserId(req);
    return this.notificationsService.findUnread(userId);
  }

  @Post('read-all')
  markAllAsRead(@Request() req: any) {
    const userId = this.getUserId(req);
    console.log(`[NotificationsController] markAllAsRead called for userId: ${userId}`);
    
    try {
      const result = this.notificationsService.markAllAsRead(userId);
      console.log(`[NotificationsController] markAllAsRead completed for userId: ${userId}`);
      return result;
    } catch (error) {
      console.error(`[NotificationsController] Error in markAllAsRead for userId: ${userId}:`, error);
      throw error;
    }
  }

  @Post(':id/read')
  async markAsRead(@Param('id') id: string, @Request() req: any) {
    const userId = this.getUserId(req);
    try {
      return await this.notificationsService.markAsRead(id, userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: any) {
    const userId = this.getUserId(req);
    try {
      return await this.notificationsService.remove(id, userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('test-chat-notification')
  @ApiOperation({ summary: 'Test chat notification system' })
  @ApiResponse({ status: 201, description: 'Test notification created' })
  async testChatNotification(@Request() req: any, @Body() body: { imageID: string, message: string }) {
    const userId = this.getUserId(req);
    const { imageID, message } = body;
    const senderID = userId;
    
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