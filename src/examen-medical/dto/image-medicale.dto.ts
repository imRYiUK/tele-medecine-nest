import { ApiProperty } from '@nestjs/swagger';

export class ImageMedicaleDto {
  @ApiProperty()
  imageID: string;

  @ApiProperty()
  examenID: string;

  @ApiProperty()
  studyInstanceUID: string;

  @ApiProperty()
  seriesInstanceUID: string;

  @ApiProperty()
  sopInstanceUID: string;

  @ApiProperty()
  dateAcquisition: Date;

  @ApiProperty()
  modalite: string;

  @ApiProperty()
  description: string;
} 