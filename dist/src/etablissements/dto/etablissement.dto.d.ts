import { TypeEtablissement } from '@prisma/client';
export declare class CreateEtablissementDto {
    nom: string;
    adresse: string;
    telephone: string;
    email: string;
    type: TypeEtablissement;
    latitude: number;
    longitude: number;
    region: string;
    description?: string;
    siteWeb?: string;
    estActif?: boolean;
}
export declare class UpdateEtablissementDto {
    nom?: string;
    adresse?: string;
    telephone?: string;
    email?: string;
    type?: TypeEtablissement;
    latitude?: number;
    longitude?: number;
    region?: string;
    description?: string;
    siteWeb?: string;
    estActif?: boolean;
}
export declare class EtablissementDto {
    etablissementID: string;
    nom: string;
    adresse: string;
    telephone: string;
    email: string;
    type: TypeEtablissement;
    latitude: number;
    longitude: number;
    region: string;
    description?: string;
    siteWeb?: string;
    estActif: boolean;
    createdAt: Date;
    updatedAt: Date;
}
