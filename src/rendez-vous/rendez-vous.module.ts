import { Module } from '@nestjs/common';
import { RendezVousService } from './rendez-vous.service';
import { RendezVousController } from './rendez-vous.controller';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  controllers: [RendezVousController],
  providers: [RendezVousService, PrismaService],
  exports: [RendezVousService],
})
export class RendezVousModule {} 