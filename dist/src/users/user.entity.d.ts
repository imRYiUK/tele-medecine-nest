export declare enum UserRole {
    ADMINISTRATEUR = "administrateur",
    MEDECIN = "medecin",
    RADIOLOGUE = "radiologue",
    PERSONNEL_ADMINISTRATIF = "personnel_administratif"
}
export declare class User {
    id: number;
    email: string;
    password: string;
    roles: UserRole[];
    isActive: boolean;
    failedLoginAttempts: number;
    lastLogin: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
