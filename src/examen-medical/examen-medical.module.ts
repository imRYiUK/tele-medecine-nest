import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ExamenMedicalService } from './examen-medical.service';
import { ExamenMedicalController } from './examen-medical.controller';
import { NotificationsModule } from '../notifications/notifications.module';
import { ImageCollaborationController } from './image-collaboration.controller';
import { ImageCollaborationService } from './image-collaboration.service';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    NotificationsModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [ExamenMedicalController, ImageCollaborationController],
  providers: [ExamenMedicalService, ImageCollaborationService, ChatGateway],
  exports: [ExamenMedicalService, ImageCollaborationService]
})
export class ExamenMedicalModule {} 