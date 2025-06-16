import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { OrthancModule } from './orthanc/orthanc.module';
import { CommonModule } from './common/common.module';
import { EtablissementsModule } from './etablissements/etablissements.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    OrthancModule,
    CommonModule,
    EtablissementsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
