import { ApiProperty } from '@nestjs/swagger';
import { Express } from 'express';

export class UploadDicomDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Fichier DICOM à uploader',
  })
  file: Express.Multer.File;
}
