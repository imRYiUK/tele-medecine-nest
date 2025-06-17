import { Module } from '@nestjs/common';
import { EtablissementsService } from './etablissements.service';
import { EtablissementsController } from './etablissements.controller';
import { NotificationsModule } from '../notifications/notifications.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [NotificationsModule, UsersModule],
  controllers: [EtablissementsController],
  providers: [EtablissementsService],
  exports: [EtablissementsService],
})
export class EtablissementsModule {} 