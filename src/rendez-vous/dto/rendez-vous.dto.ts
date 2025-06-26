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
  date: string; // ISO date string (YYYY-MM-DD)

  @ApiProperty()
  debutTime: string; // Time string (HH:mm)

  @ApiProperty()
  endTime: string; // Time string (HH:mm)

  @ApiProperty()
  motif?: string;

  @ApiProperty({ type: () => PatientInfoDto, required: false })
  patient?: PatientInfoDto;

  @ApiProperty({ type: () => MedecinInfoDto, required: false })
  medecin?: MedecinInfoDto;

  constructor(entity: any) {
    this.rendezVousID = entity.rendezVousID;
    // Handle if entity has date, debutTime, endTime directly
    if (entity.date && entity.debutTime && entity.endTime) {
      this.date = entity.date;
      this.debutTime = entity.debutTime;
      this.endTime = entity.endTime;
    } else if (entity.dateHeure) {
      // If entity has a single dateHeure (Date or ISO string), split it
      const dateObj = entity.dateHeure instanceof Date ? entity.dateHeure : new Date(entity.dateHeure);
      this.date = dateObj.toISOString().slice(0, 10); // YYYY-MM-DD
      this.debutTime = dateObj.toISOString().slice(11, 16); // HH:mm
      this.endTime = entity.endTime || this.debutTime; // fallback if endTime not present
    } else {
      this.date = '';
      this.debutTime = '';
      this.endTime = '';
    }
    this.motif = entity.motif;
    this.patient = entity.patient
      ? new PatientInfoDto(entity.patient)
      : undefined;
    this.medecin = entity.medecin
      ? new MedecinInfoDto(entity.medecin)
      : undefined;
  }
} 