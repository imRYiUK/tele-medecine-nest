export declare enum UserRole {
    ADMIN = "ADMIN",
    MEDECIN = "MEDECIN",
    SECRETAIRE = "SECRETAIRE",
    INFIRMIER = "INFIRMIER"
}
export declare class RegisterDto {
    nom: string;
    prenom: string;
    username: string;
    password: string;
    email: string;
    telephone: string;
    role: UserRole;
    etablissementID?: string;
    estActif?: boolean;
}
