import { IsString, IsEmail, IsNumber, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TypeEtablissement } from '@prisma/client';

export class CreateEtablissementDto {
  @ApiProperty({ description: 'Nom de l\'établissement' })
  @IsString()
  nom: string;

  @ApiProperty({ description: 'Adresse de l\'établissement' })
  @IsString()
  adresse: string;

  @ApiProperty({ description: 'Numéro de téléphone de l\'établissement' })
  @IsString()
  telephone: string;

  @ApiProperty({ description: 'Email de l\'établissement' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Type d\'établissement', enum: TypeEtablissement })
  @IsEnum(TypeEtablissement)
  type: TypeEtablissement;

  @ApiProperty({ description: 'Région où se trouve l\'établissement' })
  @IsString()
  region: string;

  @ApiProperty({ description: 'Description de l\'établissement', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Site web de l\'établissement', required: false })
  @IsString()
  @IsOptional()
  siteWeb?: string;

  @ApiProperty({ description: 'État d\'activation de l\'établissement', default: true })
  @IsBoolean()
  @IsOptional()
  estActif?: boolean = true;

  @ApiProperty({ description: "URL d'accès à l'instance Orthanc", required: false })
  @IsString()
  @IsOptional()
  orthancUrl?: string;

  @ApiProperty({ description: "Login pour l'accès à Orthanc", required: false })
  @IsString()
  @IsOptional()
  orthancLogin?: string;

  @ApiProperty({ description: "Mot de passe pour l'accès à Orthanc", required: false })
  @IsString()
  @IsOptional()
  orthancPassword?: string;
}

export class UpdateEtablissementDto {
  @ApiProperty({ description: 'Nom de l\'établissement', required: false })
  @IsString()
  @IsOptional()
  nom?: string;

  @ApiProperty({ description: 'Adresse de l\'établissement', required: false })
  @IsString()
  @IsOptional()
  adresse?: string;

  @ApiProperty({ description: 'Numéro de téléphone de l\'établissement', required: false })
  @IsString()
  @IsOptional()
  telephone?: string;

  @ApiProperty({ description: 'Email de l\'établissement', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'Type d\'établissement', required: false })
  @IsEnum(TypeEtablissement)
  @IsOptional()
  type?: TypeEtablissement;

  @ApiProperty({ description: 'Région où se trouve l\'établissement', required: false })
  @IsString()
  @IsOptional()
  region?: string;

  @ApiProperty({ description: 'Description de l\'établissement', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Site web de l\'établissement', required: false })
  @IsString()
  @IsOptional()
  siteWeb?: string;

  @ApiProperty({ description: 'État d\'activation de l\'établissement', required: false })
  @IsBoolean()
  @IsOptional()
  estActif?: boolean;

  @ApiProperty({ description: "URL d'accès à l'instance Orthanc", required: false })
  @IsString()
  @IsOptional()
  orthancUrl?: string;

  @ApiProperty({ description: "Login pour l'accès à Orthanc", required: false })
  @IsString()
  @IsOptional()
  orthancLogin?: string;

  @ApiProperty({ description: "Mot de passe pour l'accès à Orthanc", required: false })
  @IsString()
  @IsOptional()
  orthancPassword?: string;
}

export class EtablissementDto {
  @ApiProperty({ description: 'ID unique de l\'établissement' })
  etablissementID: string;

  @ApiProperty({ description: 'Nom de l\'établissement' })
  nom: string;

  @ApiProperty({ description: 'Adresse de l\'établissement' })
  adresse: string;

  @ApiProperty({ description: 'Numéro de téléphone de l\'établissement' })
  telephone: string;

  @ApiProperty({ description: 'Email de l\'établissement' })
  email: string;

  @ApiProperty({ description: 'Type d\'établissement', enum: TypeEtablissement })
  type: TypeEtablissement;

  @ApiProperty({ description: 'Région où se trouve l\'établissement' })
  region: string;

  @ApiProperty({ description: 'Description de l\'établissement' })
  description?: string;

  @ApiProperty({ description: 'Site web de l\'établissement' })
  siteWeb?: string;

  @ApiProperty({ description: 'État d\'activation de l\'établissement' })
  estActif: boolean;

  @ApiProperty({ description: 'Date de création' })
  createdAt: Date;

  @ApiProperty({ description: 'Date de dernière modification' })
  updatedAt: Date;

  @ApiProperty({ description: "URL d'accès à l'instance Orthanc" })
  orthancUrl?: string;

  @ApiProperty({ description: "Login pour l'accès à Orthanc" })
  orthancLogin?: string;

  @ApiProperty({ description: "Mot de passe pour l'accès à Orthanc" })
  orthancPassword?: string;

  @ApiProperty({ description: 'Nombre d\'utilisateurs dans cet établissement' })
  utilisateursCount?: number;
} 