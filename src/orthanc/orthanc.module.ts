import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { OrthancService } from './orthanc.service';
import { OrthancController } from './orthanc.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    PrismaModule,
  ],
  controllers: [OrthancController],
  providers: [OrthancService],
  exports: [OrthancService],
})
export class OrthancModule {}
