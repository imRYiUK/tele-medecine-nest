export declare class PatientInfoDto {
    patientID: string;
    nom: string;
    prenom: string;
    constructor(entity: any);
}
export declare class MedecinInfoDto {
    utilisateurID: string;
    nom: string;
    prenom: string;
    constructor(entity: any);
}
export declare class RendezVousDto {
    rendezVousID: string;
    date: string;
    debutTime: string;
    endTime: string;
    motif?: string;
    patient?: PatientInfoDto;
    medecin?: MedecinInfoDto;
    constructor(entity: any);
}
