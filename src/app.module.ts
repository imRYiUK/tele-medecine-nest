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
import { PatientsModule } from './patients/patients.module';
import { ExamenMedicalModule } from './examen-medical/examen-medical.module';
import { ConsultationMedicaleModule } from './consultation-medicale/consultation-medicale.module';

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
    PatientsModule,
    ExamenMedicalModule,
    ConsultationMedicaleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
