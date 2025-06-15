import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicalRecordDto {
  @ApiProperty({ description: 'ID du patient' })
  @IsNotEmpty()
  patientId: string;

  @ApiProperty({ description: 'Contenu du dossier médical' })
  @IsString()
  @IsNotEmpty()
  etatDossier: string;

  createdBy: string;
  createdAt: string;
}
