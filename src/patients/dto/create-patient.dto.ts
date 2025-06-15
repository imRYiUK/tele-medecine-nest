import { IsString, IsNotEmpty, IsOptional, IsDateString, IsEmail, IsEnum, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export enum Genre {
  M = 'M',
  F = 'F'
}

export enum EtatDossier {
  ACTIF = 'ACTIF',
  INACTIF = 'INACTIF',
  ARCHIVE = 'ARCHIVE'
}

export class CreateDossierMedicalDto {
  @ApiProperty({ description: 'État du dossier médical', enum: EtatDossier, default: EtatDossier.ACTIF })
  @IsEnum(EtatDossier)
  @IsNotEmpty()
  etatDossier: EtatDossier;
}

export class CreatePatientDto {
  @ApiProperty({ description: 'Nom du patient' })
  @IsString()
  @IsNotEmpty()
  nom: string;

  @ApiProperty({ description: 'Prénom du patient' })
  @IsString()
  @IsNotEmpty()
  prenom: string;

  @ApiProperty({ description: 'Date de naissance du patient', example: '1990-01-01' })
  @IsDateString()
  @IsNotEmpty()
  dateNaissance: string;

  @ApiProperty({ description: 'Genre du patient', enum: Genre })
  @IsEnum(Genre)
  @IsNotEmpty()
  genre: Genre;

  @ApiProperty({ description: 'Adresse du patient' })
  @IsString()
  @IsNotEmpty()
  adresse: string;

  @ApiProperty({ description: 'Numéro de téléphone du patient' })
  @IsString()
  @IsNotEmpty()
  telephone: string;

  @ApiProperty({ description: 'Email du patient' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Numéro d\'assurance maladie du patient' })
  @IsString()
  @IsNotEmpty()
  assuranceMaladie: string;

  @ApiProperty({ description: 'Groupe sanguin du patient' })
  @IsString()
  @IsNotEmpty()
  groupeSanguin: string;

  @ApiProperty({ description: 'ID de l\'utilisateur qui crée le patient' })
  @IsString()
  @IsNotEmpty()
  createdBy: string;

  @ApiProperty({ description: 'Dossier médical du patient', type: CreateDossierMedicalDto })
  @ValidateNested()
  @Type(() => CreateDossierMedicalDto)
  @IsOptional()
  dossierMedical?: CreateDossierMedicalDto;
}
