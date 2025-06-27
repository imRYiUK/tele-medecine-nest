import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateImageMedicaleDto {
  @ApiProperty({ description: 'ID de l\'examen médical auquel cette image appartient' })
  @IsUUID()
  @IsNotEmpty()
  examenID: string;

  @ApiProperty({ description: 'UID de l\'étude DICOM' })
  @IsString()
  @IsNotEmpty()
  studyInstanceUID: string;

  @ApiProperty({ description: 'UID de la série DICOM' })
  @IsString()
  @IsNotEmpty()
  seriesInstanceUID: string;

  @ApiProperty({ description: 'UID de l\'instance DICOM' })
  @IsString()
  @IsNotEmpty()
  sopInstanceUID: string;

  @ApiProperty({ description: 'Date d\'acquisition de l\'image (format: YYYY-MM-DD ou ISO 8601)' })
  @IsDateString({ strict: false })
  dateAcquisition: string;

  @ApiProperty({ description: 'Modalité d\'imagerie (ex: CT, MRI, X-Ray, Ultrasound)' })
  @IsString()
  @IsNotEmpty()
  modalite: string;

  @ApiProperty({ description: 'Description détaillée de l\'image et de la zone examinée' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'URL d\'accès à l\'image (WADO, preview, etc.)', required: false })
  @IsString()
  @IsOptional()
  url?: string | null;

  @ApiProperty({ description: 'ID de l\'instance Orthanc pour l\'accès aux previews', required: false })
  @IsString()
  @IsOptional()
  orthancInstanceId?: string | null;
} 