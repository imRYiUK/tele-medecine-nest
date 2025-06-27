import { ApiProperty } from '@nestjs/swagger';

export class ImageMedicaleDto {
  @ApiProperty({ description: 'Identifiant unique de l\'image médicale' })
  imageID: string;

  @ApiProperty({ description: 'ID de l\'examen médical auquel cette image appartient' })
  examenID: string;

  @ApiProperty({ description: 'UID de l\'étude DICOM' })
  studyInstanceUID: string;

  @ApiProperty({ description: 'UID de la série DICOM' })
  seriesInstanceUID: string;

  @ApiProperty({ description: 'UID de l\'instance DICOM' })
  sopInstanceUID: string;

  @ApiProperty({ description: 'Date d\'acquisition de l\'image' })
  dateAcquisition: Date;

  @ApiProperty({ description: 'Modalité d\'imagerie (ex: CT, MRI, X-Ray, Ultrasound)' })
  modalite: string;

  @ApiProperty({ description: 'Description détaillée de l\'image et de la zone examinée' })
  description: string;

  @ApiProperty({ description: 'URL d\'accès à l\'image (WADO, preview, etc.)', required: false })
  url?: string | null;

  @ApiProperty({ description: 'ID de l\'instance Orthanc pour l\'accès aux previews', required: false })
  orthancInstanceId?: string | null;
} 