import { Module } from '@nestjs/common';
import { ExamenMedicalService } from './examen-medical.service';
import { ExamenMedicalController } from './examen-medical.controller';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  controllers: [ExamenMedicalController],
  providers: [ExamenMedicalService],
  exports: [ExamenMedicalService]
})
export class ExamenMedicalModule {} 