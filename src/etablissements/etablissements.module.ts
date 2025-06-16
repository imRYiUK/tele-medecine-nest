import { Module } from '@nestjs/common';
import { EtablissementsService } from './etablissements.service';
import { EtablissementsController } from './etablissements.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EtablissementsController],
  providers: [EtablissementsService],
  exports: [EtablissementsService],
})
export class EtablissementsModule {} 