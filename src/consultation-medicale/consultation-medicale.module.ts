import { Module } from '@nestjs/common';
import { ConsultationMedicaleService } from './consultation-medicale.service';
import { ConsultationMedicaleController } from './consultation-medicale.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ConsultationMedicaleController],
  providers: [ConsultationMedicaleService],
  exports: [ConsultationMedicaleService],
})
export class ConsultationMedicaleModule {} 