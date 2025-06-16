import { Module } from '@nestjs/common';
import { JournalService } from './journal.service';
import { JournalController } from './journal.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JournalActivityService } from './journal-activity.service';

@Module({
  imports: [PrismaModule],
  controllers: [JournalController],
  providers: [JournalService, JournalActivityService],
  exports: [JournalService, JournalActivityService]
})
export class JournalModule {} 