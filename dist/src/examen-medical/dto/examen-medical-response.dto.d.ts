import { ImageMedicaleDto } from './image-medicale.dto';
export declare class PatientInfoDto {
    nom: string;
    prenom: string;
    dateNaissance: Date;
}
export declare class TypeExamenDto {
    typeExamenID: string;
    nomType: string;
    description: string;
    categorie: string;
}
export declare class DemandeParDto {
    nom: string;
    prenom: string;
    role: string;
}
export declare class RadiologueDto {
    utilisateurID: string;
    nom: string;
    prenom: string;
    email: string;
}
export declare class ExamenMedicalResponseDto {
    examenID: string;
    dossierID: string;
    patientID: string;
    dateExamen: Date;
    description: string;
    resultat?: string;
    estAnalyse: boolean;
    consultationID?: string;
    patient: PatientInfoDto;
    typeExamen: TypeExamenDto;
    demandePar: DemandeParDto;
    images: ImageMedicaleDto[];
    radiologues: RadiologueDto[];
}
