import { Module } from '@nestjs/common';
import { ConsultationMedicaleService } from './consultation-medicale.service';
import { ConsultationMedicaleController } from './consultation-medicale.controller';
import { MedicamentService } from './medicament.service';
import { MedicamentController } from './medicament.controller';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  controllers: [ConsultationMedicaleController, MedicamentController],
  providers: [ConsultationMedicaleService, MedicamentService],
  exports: [ConsultationMedicaleService, MedicamentService],
})
export class ConsultationMedicaleModule {} 