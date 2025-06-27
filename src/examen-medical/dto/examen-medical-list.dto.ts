import { ApiProperty } from '@nestjs/swagger';

export class ExamenMedicalListDto {
  @ApiProperty({ description: 'Identifiant unique de l\'examen médical' })
  examenID: string;

  @ApiProperty({ description: 'Date de l\'examen' })
  dateExamen: Date;

  @ApiProperty({ description: 'Description de l\'examen' })
  description: string;

  @ApiProperty({ description: 'Indique si l\'examen a été analysé' })
  estAnalyse: boolean;

  @ApiProperty({ description: 'Nom du patient' })
  patientNom: string;

  @ApiProperty({ description: 'Prénom du patient' })
  patientPrenom: string;

  @ApiProperty({ description: 'Type d\'examen' })
  typeExamenNom: string;

  @ApiProperty({ description: 'Catégorie de l\'examen' })
  typeExamenCategorie: string;

  @ApiProperty({ description: 'Nom du médecin qui a demandé l\'examen' })
  demandeParNom: string;

  @ApiProperty({ description: 'Prénom du médecin qui a demandé l\'examen' })
  demandeParPrenom: string;

  @ApiProperty({ description: 'Nombre d\'images associées à cet examen' })
  nombreImages: number;

  @ApiProperty({ description: 'Nombre de radiologues assignés à cet examen' })
  nombreRadiologues: number;
} 