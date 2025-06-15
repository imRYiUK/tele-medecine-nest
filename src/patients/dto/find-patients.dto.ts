import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FindPatientsDto {
  @ApiProperty({ description: 'Terme de recherche pour le nom ou prénom', required: false })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({ description: 'Numéro de page', default: 1, required: false })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiProperty({ description: 'Nombre d\'éléments par page', default: 10, required: false })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 10;
}
