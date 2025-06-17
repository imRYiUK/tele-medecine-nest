import { Module } from '@nestjs/common';
import { ConsultationMedicaleService } from './consultation-medicale.service';
import { ConsultationMedicaleController } from './consultation-medicale.controller';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  controllers: [ConsultationMedicaleController],
  providers: [ConsultationMedicaleService],
  exports: [ConsultationMedicaleService],
})
export class ConsultationMedicaleModule {} 