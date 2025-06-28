import { PrismaService } from '../prisma/prisma.service';
export declare class ImageCollaborationService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    inviteRadiologistToImage(imageID: string, inviterID: string, inviteeID: string): Promise<{
        image: {
            examen: {
                patient: {
                    nom: string;
                    prenom: string;
                };
                typeExamen: {
                    nomType: string;
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
            orthancInstanceId: string | null;
        };
        invitee: {
            nom: string;
            email: string;
            utilisateurID: string;
            prenom: string;
        };
        inviter: {
            nom: string;
            email: string;
            utilisateurID: string;
            prenom: string;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        inviteeID: string;
        inviterID: string;
        id: string;
        imageID: string;
        status: import(".prisma/client").$Enums.CollaborationStatus;
    }>;
    acceptCollaboration(collaborationId: string, inviteeID: string): Promise<{
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
            orthancInstanceId: string | null;
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
        updatedAt: Date;
        inviteeID: string;
        inviterID: string;
        id: string;
        imageID: string;
        status: import(".prisma/client").$Enums.CollaborationStatus;
    }>;
    rejectCollaboration(collaborationId: string, inviteeID: string): Promise<{
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
            orthancInstanceId: string | null;
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
        updatedAt: Date;
        inviteeID: string;
        inviterID: string;
        id: string;
        imageID: string;
        status: import(".prisma/client").$Enums.CollaborationStatus;
    }>;
    listCollaborators(imageID: string): Promise<any[]>;
    sendMessage(imageID: string, senderID: string, content: string): Promise<{
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
        senderID: string;
        content: string;
        imageID: string;
        messageID: string;
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
            orthancInstanceId: string | null;
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
        senderID: string;
        content: string;
        imageID: string;
        messageID: string;
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
            orthancInstanceId: string | null;
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
        updatedAt: Date;
        inviteeID: string;
        inviterID: string;
        id: string;
        imageID: string;
        status: import(".prisma/client").$Enums.CollaborationStatus;
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
            orthancInstanceId: string | null;
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
        updatedAt: Date;
        inviteeID: string;
        inviterID: string;
        id: string;
        imageID: string;
        status: import(".prisma/client").$Enums.CollaborationStatus;
    })[]>;
    getPendingCollaborationsForImage(imageID: string, userID: string): Promise<({
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
            orthancInstanceId: string | null;
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
        updatedAt: Date;
        inviteeID: string;
        inviterID: string;
        id: string;
        imageID: string;
        status: import(".prisma/client").$Enums.CollaborationStatus;
    })[]>;
    getSentInvitations(userID: string): Promise<({
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
            orthancInstanceId: string | null;
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
        updatedAt: Date;
        inviteeID: string;
        inviterID: string;
        id: string;
        imageID: string;
        status: import(".prisma/client").$Enums.CollaborationStatus;
    })[]>;
    findImageBySopInstanceUID(sopInstanceUID: string): Promise<{
        description: string;
        examenID: string;
        url: string | null;
        imageID: string;
        studyInstanceUID: string;
        seriesInstanceUID: string;
        sopInstanceUID: string;
        dateAcquisition: Date;
        modalite: string;
        orthancInstanceId: string | null;
    }>;
}
