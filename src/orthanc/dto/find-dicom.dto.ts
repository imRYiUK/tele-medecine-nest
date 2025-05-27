import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsObject, IsNotEmpty } from 'class-validator';

export class FindDicomDto {
  @ApiProperty({
    enum: ['Patient', 'Study', 'Series', 'Instance'],
    description: 'Niveau de recherche DICOM',
    example: 'Study',
  })
  @IsEnum(['Patient', 'Study', 'Series', 'Instance'])
  @IsNotEmpty()
  Level: string;

  @ApiProperty({
    description: 'Critères de recherche DICOM',
    example: {
      PatientID: '*',
      StudyDate: '20250101-20251231',
      ModalitiesInStudy: 'CT',
    },
    additionalProperties: true,
  })
  @IsObject()
  @IsNotEmpty()
  Query: Record<string, any>;
}
