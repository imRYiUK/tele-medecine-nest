import { ApiProperty } from '@nestjs/swagger';

export class PatientInfoDto {
  @ApiProperty()
  patientID: string;
  @ApiProperty()
  nom: string;
  @ApiProperty()
  prenom: string;
  constructor(entity: any) {
    this.patientID = entity.patientID;
    this.nom = entity.nom;
    this.prenom = entity.prenom;
  }
}

export class MedecinInfoDto {
  @ApiProperty()
  utilisateurID: string;
  @ApiProperty()
  nom: string;
  @ApiProperty()
  prenom: string;
  constructor(entity: any) {
    this.utilisateurID = entity.utilisateurID;
    this.nom = entity.nom;
    this.prenom = entity.prenom;
  }
}

export class RendezVousDto {
  @ApiProperty()
  rendezVousID: string;

  @ApiProperty()
  dateHeure: string; // ISO string

  @ApiProperty()
  motif?: string;

  @ApiProperty({ type: () => PatientInfoDto, required: false })
  patient?: PatientInfoDto;

  @ApiProperty({ type: () => MedecinInfoDto, required: false })
  medecin?: MedecinInfoDto;

  constructor(entity: any) {
    this.rendezVousID = entity.rendezVousID;
    this.dateHeure = entity.dateHeure instanceof Date
      ? entity.dateHeure.toISOString()
      : String(entity.dateHeure);
    this.motif = entity.motif;
    this.patient = entity.patient
      ? new PatientInfoDto(entity.patient)
      : undefined;
    this.medecin = entity.medecin
      ? new MedecinInfoDto(entity.medecin)
      : undefined;
  }
} 