import { PrismaService } from '../prisma/prisma.service';
export declare class ImageCollaborationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    inviteRadiologistToImage(imageID: string, inviterID: string, inviteeID: string): Promise<{
        createdAt: Date;
        id: string;
        imageID: string;
        inviterID: string;
        inviteeID: string;
    }>;
    listCollaborators(imageID: string): Promise<{
        etablissementID: string | null;
        nom: string;
        telephone: string;
        email: string;
        estActif: boolean;
        utilisateurID: string;
        prenom: string;
        username: string;
        password: string;
        role: string;
    }[]>;
    sendMessage(imageID: string, senderID: string, content: string): Promise<{
        content: string;
        imageID: string;
        messageID: string;
        senderID: string;
        timestamp: Date;
    }>;
    getMessages(imageID: string): Promise<({
        image: {
            examen: {
                patient: {
                    nom: string;
                    adresse: string;
                    telephone: string;
                    email: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    prenom: string;
                    patientID: string;
                    dateNaissance: Date;
                    genre: string;
                    groupeSanguin: string;
                    createdBy: string;
                };
                typeExamen: {
                    description: string;
                    typeExamenID: string;
                    nomType: string;
                    categorie: string;
                };
                demandePar: {
                    etablissementID: string | null;
                    nom: string;
                    telephone: string;
                    email: string;
                    estActif: boolean;
                    utilisateurID: string;
                    prenom: string;
                    username: string;
                    password: string;
                    role: string;
                };
            } & {
                description: string;
                patientID: string;
                dossierID: string;
                typeExamenID: string;
                consultationID: string | null;
                examenID: string;
                demandeParID: string;
                dateExamen: Date;
                resultat: string | null;
                estAnalyse: boolean;
            };
        } & {
            description: string;
            examenID: string;
            url: string | null;
            imageID: string;
            studyInstanceUID: string;
            seriesInstanceUID: string;
            sopInstanceUID: string;
            dateAcquisition: Date;
            modalite: string;
        };
        sender: {
            etablissementID: string | null;
            nom: string;
            telephone: string;
            email: string;
            estActif: boolean;
            utilisateurID: string;
            prenom: string;
            username: string;
            password: string;
            role: string;
        };
    } & {
        content: string;
        imageID: string;
        messageID: string;
        senderID: string;
        timestamp: Date;
    })[]>;
    getUserCollaborations(userID: string): Promise<({
        image: {
            examen: {
                patient: {
                    nom: string;
                    adresse: string;
                    telephone: string;
                    email: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    prenom: string;
                    patientID: string;
                    dateNaissance: Date;
                    genre: string;
                    groupeSanguin: string;
                    createdBy: string;
                };
                typeExamen: {
                    description: string;
                    typeExamenID: string;
                    nomType: string;
                    categorie: string;
                };
                demandePar: {
                    etablissementID: string | null;
                    nom: string;
                    telephone: string;
                    email: string;
                    estActif: boolean;
                    utilisateurID: string;
                    prenom: string;
                    username: string;
                    password: string;
                    role: string;
                };
            } & {
                description: string;
                patientID: string;
                dossierID: string;
                typeExamenID: string;
                consultationID: string | null;
                examenID: string;
                demandeParID: string;
                dateExamen: Date;
                resultat: string | null;
                estAnalyse: boolean;
            };
        } & {
            description: string;
            examenID: string;
            url: string | null;
            imageID: string;
            studyInstanceUID: string;
            seriesInstanceUID: string;
            sopInstanceUID: string;
            dateAcquisition: Date;
            modalite: string;
        };
        invitee: {
            etablissementID: string | null;
            nom: string;
            telephone: string;
            email: string;
            estActif: boolean;
            utilisateurID: string;
            prenom: string;
            username: string;
            password: string;
            role: string;
        };
        inviter: {
            etablissementID: string | null;
            nom: string;
            telephone: string;
            email: string;
            estActif: boolean;
            utilisateurID: string;
            prenom: string;
            username: string;
            password: string;
            role: string;
        };
    } & {
        createdAt: Date;
        id: string;
        imageID: string;
        inviterID: string;
        inviteeID: string;
    })[]>;
    getPendingCollaborations(userID: string): Promise<({
        image: {
            examen: {
                patient: {
                    nom: string;
                    adresse: string;
                    telephone: string;
                    email: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    prenom: string;
                    patientID: string;
                    dateNaissance: Date;
                    genre: string;
                    groupeSanguin: string;
                    createdBy: string;
                };
                typeExamen: {
                    description: string;
                    typeExamenID: string;
                    nomType: string;
                    categorie: string;
                };
                demandePar: {
                    etablissementID: string | null;
                    nom: string;
                    telephone: string;
                    email: string;
                    estActif: boolean;
                    utilisateurID: string;
                    prenom: string;
                    username: string;
                    password: string;
                    role: string;
                };
            } & {
                description: string;
                patientID: string;
                dossierID: string;
                typeExamenID: string;
                consultationID: string | null;
                examenID: string;
                demandeParID: string;
                dateExamen: Date;
                resultat: string | null;
                estAnalyse: boolean;
            };
        } & {
            description: string;
            examenID: string;
            url: string | null;
            imageID: string;
            studyInstanceUID: string;
            seriesInstanceUID: string;
            sopInstanceUID: string;
            dateAcquisition: Date;
            modalite: string;
        };
        invitee: {
            etablissementID: string | null;
            nom: string;
            telephone: string;
            email: string;
            estActif: boolean;
            utilisateurID: string;
            prenom: string;
            username: string;
            password: string;
            role: string;
        };
        inviter: {
            etablissementID: string | null;
            nom: string;
            telephone: string;
            email: string;
            estActif: boolean;
            utilisateurID: string;
            prenom: string;
            username: string;
            password: string;
            role: string;
        };
    } & {
        createdAt: Date;
        id: string;
        imageID: string;
        inviterID: string;
        inviteeID: string;
    })[]>;
}
