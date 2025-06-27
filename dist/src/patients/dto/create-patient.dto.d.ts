export declare enum Genre {
    M = "M",
    F = "F"
}
export declare enum EtatDossier {
    ACTIF = "ACTIF",
    INACTIF = "INACTIF",
    ARCHIVE = "ARCHIVE"
}
export declare class CreateDossierMedicalDto {
    etatDossier: EtatDossier;
}
export declare class CreatePatientDto {
    nom: string;
    prenom: string;
    dateNaissance: string;
    genre: Genre;
    adresse: string;
    telephone: string;
    email: string;
    groupeSanguin: string;
    createdBy: string;
    dossierMedical?: CreateDossierMedicalDto;
}
