import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController, MedicalRecordsController } from './patients.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JournalModule } from '../journal/journal.module';

@Module({
  imports: [PrismaModule, JournalModule],
  controllers: [PatientsController, MedicalRecordsController],
  providers: [PatientsService],
  exports: [PatientsService],
})
export class PatientsModule {}
