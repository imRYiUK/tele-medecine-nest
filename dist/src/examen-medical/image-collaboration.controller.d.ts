import { ImageCollaborationService } from './image-collaboration.service';
import { CreateChatMessageDto } from './dto/chat-message.dto';
export declare class ImageCollaborationController {
    private readonly collaborationService;
    private readonly logger;
    constructor(collaborationService: ImageCollaborationService);
    getReceivedInvitations(req: any): Promise<({
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
    } & {
        createdAt: Date;
        updatedAt: Date;
        inviteeID: string;
        inviterID: string;
        id: string;
        imageID: string;
        status: import(".prisma/client").$Enums.CollaborationStatus;
    })[]>;
    getActiveCollaborations(req: any): Promise<({
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
    } & {
        createdAt: Date;
        updatedAt: Date;
        inviteeID: string;
        inviterID: string;
        id: string;
        imageID: string;
        status: import(".prisma/client").$Enums.CollaborationStatus;
    })[]>;
    inviteRadiologistToImage(imageID: string, inviteeID: string, req: any): Promise<{
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
    } & {
        createdAt: Date;
        updatedAt: Date;
        inviteeID: string;
        inviterID: string;
        id: string;
        imageID: string;
        status: import(".prisma/client").$Enums.CollaborationStatus;
    }>;
    inviteRadiologistToImageBySopInstanceUID(sopInstanceUID: string, inviteeID: string, req: any): Promise<{
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
    } & {
        createdAt: Date;
        updatedAt: Date;
        inviteeID: string;
        inviterID: string;
        id: string;
        imageID: string;
        status: import(".prisma/client").$Enums.CollaborationStatus;
    }>;
    acceptCollaborationInvitation(collaborationId: string, req: any): Promise<{
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
    } & {
        createdAt: Date;
        updatedAt: Date;
        inviteeID: string;
        inviterID: string;
        id: string;
        imageID: string;
        status: import(".prisma/client").$Enums.CollaborationStatus;
    }>;
    rejectCollaborationInvitation(collaborationId: string, req: any): Promise<{
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
    } & {
        createdAt: Date;
        updatedAt: Date;
        inviteeID: string;
        inviterID: string;
        id: string;
        imageID: string;
        status: import(".prisma/client").$Enums.CollaborationStatus;
    }>;
    getImageCollaborators(imageID: string): Promise<any[]>;
    getImageCollaboratorsBySopInstanceUID(sopInstanceUID: string): Promise<any[]>;
    getPendingCollaborationsBySopInstanceUID(sopInstanceUID: string): Promise<({
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
    } & {
        createdAt: Date;
        updatedAt: Date;
        inviteeID: string;
        inviterID: string;
        id: string;
        imageID: string;
        status: import(".prisma/client").$Enums.CollaborationStatus;
    })[]>;
    sendMessageOnImage(imageID: string, createMessageDto: CreateChatMessageDto, req: any): Promise<{
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
    getImageMessages(imageID: string): Promise<({
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
}
