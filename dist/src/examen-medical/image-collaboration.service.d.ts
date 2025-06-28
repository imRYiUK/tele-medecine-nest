import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
export declare class ImageCollaborationService {
    private readonly prisma;
    private readonly notificationsService;
    private readonly logger;
    constructor(prisma: PrismaService, notificationsService: NotificationsService);
    inviteRadiologistToImage(imageID: string, inviterID: string, inviteeID: string): Promise<{
        inviter: {
            nom: string;
            email: string;
            utilisateurID: string;
            prenom: string;
        };
        invitee: {
            nom: string;
            email: string;
            utilisateurID: string;
            prenom: string;
        };
        image: {
            examen: {
                typeExamen: {
                    nomType: string;
                };
                patient: {
                    nom: string;
                    prenom: string;
                };
            } & {
                typeExamenID: string;
                description: string;
                demandeParID: string;
                examenID: string;
                dossierID: string;
                patientID: string;
                dateExamen: Date;
                resultat: string | null;
                estAnalyse: boolean;
                consultationID: string | null;
            };
        } & {
            description: string;
            url: string | null;
            imageID: string;
            examenID: string;
            studyInstanceUID: string;
            seriesInstanceUID: string;
            sopInstanceUID: string;
            dateAcquisition: Date;
            modalite: string;
            orthancInstanceId: string | null;
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
        image: {
            examen: {
                typeExamen: {
                    typeExamenID: string;
                    nomType: string;
                    description: string;
                    categorie: string;
                };
                patient: {
                    nom: string;
                    adresse: string;
                    telephone: string;
                    email: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    prenom: string;
                    createdBy: string;
                    patientID: string;
                    dateNaissance: Date;
                    genre: string;
                    groupeSanguin: string;
                };
            } & {
                typeExamenID: string;
                description: string;
                demandeParID: string;
                examenID: string;
                dossierID: string;
                patientID: string;
                dateExamen: Date;
                resultat: string | null;
                estAnalyse: boolean;
                consultationID: string | null;
            };
        } & {
            description: string;
            url: string | null;
            imageID: string;
            examenID: string;
            studyInstanceUID: string;
            seriesInstanceUID: string;
            sopInstanceUID: string;
            dateAcquisition: Date;
            modalite: string;
            orthancInstanceId: string | null;
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
        image: {
            examen: {
                typeExamen: {
                    typeExamenID: string;
                    nomType: string;
                    description: string;
                    categorie: string;
                };
                patient: {
                    nom: string;
                    adresse: string;
                    telephone: string;
                    email: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    prenom: string;
                    createdBy: string;
                    patientID: string;
                    dateNaissance: Date;
                    genre: string;
                    groupeSanguin: string;
                };
            } & {
                typeExamenID: string;
                description: string;
                demandeParID: string;
                examenID: string;
                dossierID: string;
                patientID: string;
                dateExamen: Date;
                resultat: string | null;
                estAnalyse: boolean;
                consultationID: string | null;
            };
        } & {
            description: string;
            url: string | null;
            imageID: string;
            examenID: string;
            studyInstanceUID: string;
            seriesInstanceUID: string;
            sopInstanceUID: string;
            dateAcquisition: Date;
            modalite: string;
            orthancInstanceId: string | null;
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
                typeExamen: {
                    typeExamenID: string;
                    nomType: string;
                    description: string;
                    categorie: string;
                };
                patient: {
                    nom: string;
                    adresse: string;
                    telephone: string;
                    email: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    prenom: string;
                    createdBy: string;
                    patientID: string;
                    dateNaissance: Date;
                    genre: string;
                    groupeSanguin: string;
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
                typeExamenID: string;
                description: string;
                demandeParID: string;
                examenID: string;
                dossierID: string;
                patientID: string;
                dateExamen: Date;
                resultat: string | null;
                estAnalyse: boolean;
                consultationID: string | null;
            };
        } & {
            description: string;
            url: string | null;
            imageID: string;
            examenID: string;
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
        image: {
            examen: {
                typeExamen: {
                    typeExamenID: string;
                    nomType: string;
                    description: string;
                    categorie: string;
                };
                patient: {
                    nom: string;
                    adresse: string;
                    telephone: string;
                    email: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    prenom: string;
                    createdBy: string;
                    patientID: string;
                    dateNaissance: Date;
                    genre: string;
                    groupeSanguin: string;
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
                typeExamenID: string;
                description: string;
                demandeParID: string;
                examenID: string;
                dossierID: string;
                patientID: string;
                dateExamen: Date;
                resultat: string | null;
                estAnalyse: boolean;
                consultationID: string | null;
            };
        } & {
            description: string;
            url: string | null;
            imageID: string;
            examenID: string;
            studyInstanceUID: string;
            seriesInstanceUID: string;
            sopInstanceUID: string;
            dateAcquisition: Date;
            modalite: string;
            orthancInstanceId: string | null;
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
        image: {
            examen: {
                typeExamen: {
                    typeExamenID: string;
                    nomType: string;
                    description: string;
                    categorie: string;
                };
                patient: {
                    nom: string;
                    adresse: string;
                    telephone: string;
                    email: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    prenom: string;
                    createdBy: string;
                    patientID: string;
                    dateNaissance: Date;
                    genre: string;
                    groupeSanguin: string;
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
                typeExamenID: string;
                description: string;
                demandeParID: string;
                examenID: string;
                dossierID: string;
                patientID: string;
                dateExamen: Date;
                resultat: string | null;
                estAnalyse: boolean;
                consultationID: string | null;
            };
        } & {
            description: string;
            url: string | null;
            imageID: string;
            examenID: string;
            studyInstanceUID: string;
            seriesInstanceUID: string;
            sopInstanceUID: string;
            dateAcquisition: Date;
            modalite: string;
            orthancInstanceId: string | null;
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
        image: {
            examen: {
                typeExamen: {
                    typeExamenID: string;
                    nomType: string;
                    description: string;
                    categorie: string;
                };
                patient: {
                    nom: string;
                    adresse: string;
                    telephone: string;
                    email: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    prenom: string;
                    createdBy: string;
                    patientID: string;
                    dateNaissance: Date;
                    genre: string;
                    groupeSanguin: string;
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
                typeExamenID: string;
                description: string;
                demandeParID: string;
                examenID: string;
                dossierID: string;
                patientID: string;
                dateExamen: Date;
                resultat: string | null;
                estAnalyse: boolean;
                consultationID: string | null;
            };
        } & {
            description: string;
            url: string | null;
            imageID: string;
            examenID: string;
            studyInstanceUID: string;
            seriesInstanceUID: string;
            sopInstanceUID: string;
            dateAcquisition: Date;
            modalite: string;
            orthancInstanceId: string | null;
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
    getAllPendingCollaborationsForImage(imageID: string): Promise<({
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
        image: {
            examen: {
                typeExamen: {
                    typeExamenID: string;
                    nomType: string;
                    description: string;
                    categorie: string;
                };
                patient: {
                    nom: string;
                    adresse: string;
                    telephone: string;
                    email: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    prenom: string;
                    createdBy: string;
                    patientID: string;
                    dateNaissance: Date;
                    genre: string;
                    groupeSanguin: string;
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
                typeExamenID: string;
                description: string;
                demandeParID: string;
                examenID: string;
                dossierID: string;
                patientID: string;
                dateExamen: Date;
                resultat: string | null;
                estAnalyse: boolean;
                consultationID: string | null;
            };
        } & {
            description: string;
            url: string | null;
            imageID: string;
            examenID: string;
            studyInstanceUID: string;
            seriesInstanceUID: string;
            sopInstanceUID: string;
            dateAcquisition: Date;
            modalite: string;
            orthancInstanceId: string | null;
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
        image: {
            examen: {
                typeExamen: {
                    typeExamenID: string;
                    nomType: string;
                    description: string;
                    categorie: string;
                };
                patient: {
                    nom: string;
                    adresse: string;
                    telephone: string;
                    email: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    prenom: string;
                    createdBy: string;
                    patientID: string;
                    dateNaissance: Date;
                    genre: string;
                    groupeSanguin: string;
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
                typeExamenID: string;
                description: string;
                demandeParID: string;
                examenID: string;
                dossierID: string;
                patientID: string;
                dateExamen: Date;
                resultat: string | null;
                estAnalyse: boolean;
                consultationID: string | null;
            };
        } & {
            description: string;
            url: string | null;
            imageID: string;
            examenID: string;
            studyInstanceUID: string;
            seriesInstanceUID: string;
            sopInstanceUID: string;
            dateAcquisition: Date;
            modalite: string;
            orthancInstanceId: string | null;
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
    getSentInvitationsForImage(imageID: string, userID: string): Promise<({
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
        image: {
            examen: {
                typeExamen: {
                    typeExamenID: string;
                    nomType: string;
                    description: string;
                    categorie: string;
                };
                patient: {
                    nom: string;
                    adresse: string;
                    telephone: string;
                    email: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    prenom: string;
                    createdBy: string;
                    patientID: string;
                    dateNaissance: Date;
                    genre: string;
                    groupeSanguin: string;
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
                typeExamenID: string;
                description: string;
                demandeParID: string;
                examenID: string;
                dossierID: string;
                patientID: string;
                dateExamen: Date;
                resultat: string | null;
                estAnalyse: boolean;
                consultationID: string | null;
            };
        } & {
            description: string;
            url: string | null;
            imageID: string;
            examenID: string;
            studyInstanceUID: string;
            seriesInstanceUID: string;
            sopInstanceUID: string;
            dateAcquisition: Date;
            modalite: string;
            orthancInstanceId: string | null;
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
        url: string | null;
        imageID: string;
        examenID: string;
        studyInstanceUID: string;
        seriesInstanceUID: string;
        sopInstanceUID: string;
        dateAcquisition: Date;
        modalite: string;
        orthancInstanceId: string | null;
    }>;
}
