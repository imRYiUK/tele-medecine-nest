import { ApiProperty } from '@nestjs/swagger';
import { ImageMedicaleDto } from './image-medicale.dto';

export class PatientInfoDto {
  @ApiProperty({ description: 'Nom du patient' })
  nom: string;

  @ApiProperty({ description: 'Prénom du patient' })
  prenom: string;

  @ApiProperty({ description: 'Date de naissance du patient' })
  dateNaissance: Date;
}

export class TypeExamenDto {
  @ApiProperty({ description: 'ID du type d\'examen' })
  typeExamenID: string;

  @ApiProperty({ description: 'Nom du type d\'examen' })
  nomType: string;

  @ApiProperty({ description: 'Description du type d\'examen' })
  description: string;

  @ApiProperty({ description: 'Catégorie de l\'examen' })
  categorie: string;
}

export class DemandeParDto {
  @ApiProperty({ description: 'Nom du médecin qui a demandé l\'examen' })
  nom: string;

  @ApiProperty({ description: 'Prénom du médecin qui a demandé l\'examen' })
  prenom: string;

  @ApiProperty({ description: 'Rôle du médecin' })
  role: string;
}

export class RadiologueDto {
  @ApiProperty({ description: 'ID du radiologue' })
  utilisateurID: string;

  @ApiProperty({ description: 'Nom du radiologue' })
  nom: string;

  @ApiProperty({ description: 'Prénom du radiologue' })
  prenom: string;

  @ApiProperty({ description: 'Email du radiologue' })
  email: string;
}

export class ExamenMedicalResponseDto {
  @ApiProperty({ description: 'Identifiant unique de l\'examen médical' })
  examenID: string;

  @ApiProperty({ description: 'ID du dossier médical' })
  dossierID: string;

  @ApiProperty({ description: 'ID du patient' })
  patientID: string;

  @ApiProperty({ description: 'Date de l\'examen' })
  dateExamen: Date;

  @ApiProperty({ description: 'Description de l\'examen' })
  description: string;

  @ApiProperty({ description: 'Résultat de l\'examen (si analysé)', required: false })
  resultat?: string;

  @ApiProperty({ description: 'Indique si l\'examen a été analysé' })
  estAnalyse: boolean;

  @ApiProperty({ description: 'ID de la consultation associée (si applicable)', required: false })
  consultationID?: string;

  @ApiProperty({ description: 'Informations du patient' })
  patient: PatientInfoDto;

  @ApiProperty({ description: 'Type d\'examen' })
  typeExamen: TypeExamenDto;

  @ApiProperty({ description: 'Médecin qui a demandé l\'examen' })
  demandePar: DemandeParDto;

  @ApiProperty({ description: 'Images médicales associées à cet examen', type: [ImageMedicaleDto] })
  images: ImageMedicaleDto[];

  @ApiProperty({ description: 'Radiologues assignés à cet examen', type: [RadiologueDto] })
  radiologues: RadiologueDto[];
} 