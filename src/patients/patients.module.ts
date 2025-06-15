import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController, MedicalRecordsController } from './patients.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PatientsController, MedicalRecordsController],
  providers: [PatientsService],
  exports: [PatientsService],
})
export class PatientsModule {}
