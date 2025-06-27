import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsDate, IsBoolean, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreatePrescriptionDto {
  @ApiProperty({ description: 'ID du médicament' })
  @IsString()
  medicamentID: string;

  @ApiProperty({ description: 'Posologie' })
  @IsString()
  posologie: string;

  @ApiProperty({ description: 'Durée du traitement' })
  @IsString()
  duree: string;

  @ApiProperty({ description: 'Instructions pour la prise du médicament' })
  @IsString()
  instructions: string;
}

class CreateOrdonnanceDto {
  @ApiProperty({ description: 'Liste des prescriptions' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePrescriptionDto)
  prescriptions: CreatePrescriptionDto[];
}

export class CreateConsultationMedicaleDto {
  @ApiProperty({ description: 'ID du dossier médical' })
  @IsUUID()
  dossierID: string;

  @ApiProperty({ description: 'ID du médecin' })
  @IsUUID()
  medecinID: string;

  @ApiProperty({ description: 'Date de la consultation' })
  @IsDate()
  @Type(() => Date)
  dateConsultation: Date;

  @ApiProperty({ description: 'Motif de la consultation' })
  @IsString()
  motif: string;

  @ApiProperty({ description: 'Diagnostics établis' })
  @IsString()
  diagnostics: string;

  @ApiProperty({ description: 'Observations médicales' })
  @IsString()
  observations: string;

  @ApiProperty({ description: 'Traitement prescrit' })
  @IsString()
  traitementPrescrit: string;

  @ApiProperty({ description: 'Indique si la consultation est en télémédecine' })
  @IsBoolean()
  @IsOptional()
  estTelemedicine?: boolean;

  @ApiProperty({ description: 'Lien de la visioconférence (optionnel)' })
  @IsString()
  @IsOptional()
  lienVisio?: string;

  @ApiProperty({ description: 'Ordonnance associée à la consultation', type: CreateOrdonnanceDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateOrdonnanceDto)
  ordonnance?: CreateOrdonnanceDto;
} 