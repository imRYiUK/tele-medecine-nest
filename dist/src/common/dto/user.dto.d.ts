export declare class UserDto {
    utilisateurID: string;
    nom: string;
    prenom: string;
    username: string;
    email: string;
    telephone: string;
    role: string;
    etablissementID?: string | null;
    estActif: boolean;
    password?: string;
}
export declare class CreateUserDto {
    nom: string;
    prenom: string;
    username: string;
    password: string;
    email: string;
    telephone: string;
    role: string;
    etablissementID?: string;
}
export declare class UpdateUserDto {
    nom?: string;
    prenom?: string;
    username?: string;
    email?: string;
    telephone?: string;
    role?: string;
    etablissementID?: string;
    estActif?: boolean;
    password?: string;
}
