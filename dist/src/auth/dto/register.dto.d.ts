import { UserRole } from '../../common/constants/roles';
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
