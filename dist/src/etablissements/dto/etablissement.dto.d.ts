import { TypeEtablissement } from '@prisma/client';
export declare class CreateEtablissementDto {
    nom: string;
    adresse: string;
    telephone: string;
    email: string;
    type: TypeEtablissement;
    region: string;
    description?: string;
    siteWeb?: string;
    estActif?: boolean;
    orthancUrl?: string;
    orthancLogin?: string;
    orthancPassword?: string;
}
export declare class UpdateEtablissementDto {
    nom?: string;
    adresse?: string;
    telephone?: string;
    email?: string;
    type?: TypeEtablissement;
    region?: string;
    description?: string;
    siteWeb?: string;
    estActif?: boolean;
    orthancUrl?: string;
    orthancLogin?: string;
    orthancPassword?: string;
}
export declare class EtablissementDto {
    etablissementID: string;
    nom: string;
    adresse: string;
    telephone: string;
    email: string;
    type: TypeEtablissement;
    region: string;
    description?: string;
    siteWeb?: string;
    estActif: boolean;
    createdAt: Date;
    updatedAt: Date;
    orthancUrl?: string;
    orthancLogin?: string;
    orthancPassword?: string;
    utilisateursCount?: number;
}
