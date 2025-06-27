import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsDateString, IsOptional, IsBoolean } from 'class-validator';

export class CreateExamenMedicalDto {
  @ApiProperty({ 
    description: 'ID du dossier médical auquel l\'examen appartient',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID('4', { message: 'dossierID doit être un UUID valide' })
  dossierID: string;

  @ApiProperty({ 
    description: 'ID du patient qui subit l\'examen',
    example: '123e4567-e89b-12d3-a456-426614174001'
  })
  @IsUUID('4', { message: 'patientID doit être un UUID valide' })
  patientID: string;

  @ApiProperty({ 
    description: 'ID du type d\'examen (ex: radiographie, échographie, etc.)',
    example: '123e4567-e89b-12d3-a456-426614174002'
  })
  @IsUUID('4', { message: 'typeExamenID doit être un UUID valide' })
  typeExamenID: string;

  @ApiProperty({ 
    description: 'Date prévue ou effectuée de l\'examen (format ISO: YYYY-MM-DDTHH:mm:ss.sssZ)',
    example: '2024-01-15T10:30:00.000Z'
  })
  @IsDateString({}, { message: 'dateExamen doit être une date valide au format ISO' })
  dateExamen: string;

  @ApiProperty({ 
    description: 'Description détaillée de l\'examen et des instructions',
    example: 'Radiographie du thorax pour suspicion de pneumonie'
  })
  @IsString({ message: 'description doit être une chaîne de caractères' })
  description: string;

  @ApiProperty({ 
    description: 'Résultat de l\'examen (rempli après analyse)', 
    required: false,
    example: 'Pneumonie confirmée dans le lobe inférieur droit'
  })
  @IsString({ message: 'resultat doit être une chaîne de caractères' })
  @IsOptional()
  resultat?: string;

  @ApiProperty({ 
    description: 'Indique si l\'examen a été analysé par un radiologue', 
    required: false, 
    default: false,
    example: false
  })
  @IsBoolean({ message: 'estAnalyse doit être un booléen' })
  @IsOptional()
  estAnalyse?: boolean;
} 