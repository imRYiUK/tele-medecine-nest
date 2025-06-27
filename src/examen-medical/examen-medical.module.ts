import { Module } from '@nestjs/common';
import { ExamenMedicalService } from './examen-medical.service';
import { ExamenMedicalController } from './examen-medical.controller';
import { NotificationsModule } from '../notifications/notifications.module';
import { ImageCollaborationController } from './image-collaboration.controller';
import { ImageCollaborationService } from './image-collaboration.service';

@Module({
  imports: [NotificationsModule],
  controllers: [ExamenMedicalController, ImageCollaborationController],
  providers: [ExamenMedicalService, ImageCollaborationService],
  exports: [ExamenMedicalService]
})
export class ExamenMedicalModule {} 