import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsDate, IsOptional, IsBoolean } from 'class-validator';

export class CreateExamenMedicalDto {
  @ApiProperty({ description: 'ID du dossier médical' })
  @IsUUID()
  dossierID: string;

  @ApiProperty({ description: 'ID du patient' })
  @IsUUID()
  patientID: string;

  @ApiProperty({ description: 'ID du type d\'examen' })
  @IsUUID()
  typeExamenID: string;

  @ApiProperty({ description: 'Date de l\'examen' })
  @IsDate()
  dateExamen: Date;

  @ApiProperty({ description: 'Description de l\'examen' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Résultat de l\'examen (optionnel)' })
  @IsString()
  @IsOptional()
  resultat?: string;

  @ApiProperty({ description: 'État de l\'analyse' })
  @IsBoolean()
  @IsOptional()
  estAnalyse?: boolean;
} 