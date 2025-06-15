import { PartialType } from '@nestjs/swagger';
import { CreatePatientDto } from './create-patient.dto';
import { IsOptional, IsDateString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  @ApiProperty({ description: 'Date de naissance du patient', example: '1990-01-01', required: false })
  @IsDateString()
  @IsOptional()
  dateNaissance?: string;
}
