import { Module } from '@nestjs/common';
import { ExamenMedicalService } from './examen-medical.service';
import { ExamenMedicalController } from './examen-medical.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExamenMedicalController],
  providers: [ExamenMedicalService],
  exports: [ExamenMedicalService]
})
export class ExamenMedicalModule {} 