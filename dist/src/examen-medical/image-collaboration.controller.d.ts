import { ImageCollaborationService } from './image-collaboration.service';
import { CreateChatMessageDto } from './dto/chat-message.dto';
export declare class ImageCollaborationController {
    private readonly collaborationService;
    private readonly logger;
    constructor(collaborationService: ImageCollaborationService);
    invite(imageID: string, inviteeID: string, req: any): Promise<{
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
    inviteBySopInstanceUID(sopInstanceUID: string, inviteeID: string, req: any): Promise<{
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
    acceptCollaboration(collaborationId: string, req: any): Promise<{
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
    rejectCollaboration(collaborationId: string, req: any): Promise<{
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
    collaborators(imageID: string): Promise<any[]>;
    collaboratorsBySopInstanceUID(sopInstanceUID: string): Promise<any[]>;
    getPendingCollaborationsForImage(imageID: string, req: any): Promise<({
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
    getPendingCollaborationsForImageBySopInstanceUID(sopInstanceUID: string, req: any): Promise<({
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
    sendMessage(imageID: string, createMessageDto: CreateChatMessageDto, req: any): Promise<{
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
    getUserCollaborations(req: any): Promise<({
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
    getPendingCollaborations(req: any): Promise<({
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
    getSentInvitations(req: any): Promise<({
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
}
