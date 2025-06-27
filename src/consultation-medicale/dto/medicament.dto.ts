import { ApiProperty } from '@nestjs/swagger';

export class MedicamentDto {
  @ApiProperty()
  medicamentID: string;

  @ApiProperty()
  nom: string;

  constructor(entity: any) {
    this.medicamentID = entity.medicamentID;
    this.nom = entity.nom;
  }
} 