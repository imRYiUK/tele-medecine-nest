import { ImageCollaborationService } from './image-collaboration.service';
import { CreateChatMessageDto } from './dto/chat-message.dto';
export declare class ImageCollaborationController {
    private readonly collaborationService;
    private readonly logger;
    constructor(collaborationService: ImageCollaborationService);
    getReceivedInvitations(req: any): Promise<({
        inviter: {
            utilisateurID: string;
            nom: string;
            prenom: string;
            username: string;
            password: string;
            email: string;
            telephone: string;
            role: string;
            etablissementID: string | null;
            estActif: boolean;
        };
        invitee: {
            utilisateurID: string;
            nom: string;
            prenom: string;
            username: string;
            password: string;
            email: string;
            telephone: string;
            role: string;
            etablissementID: string | null;
            estActif: boolean;
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
                    prenom: string;
                    email: string | null;
                    telephone: string;
                    adresse: string;
                    createdAt: Date;
                    updatedAt: Date;
                    createdBy: string;
                    patientID: string;
                    dateNaissance: Date;
                    genre: string;
                    groupeSanguin: string;
                };
                demandePar: {
                    utilisateurID: string;
                    nom: string;
                    prenom: string;
                    username: string;
                    password: string;
                    email: string;
                    telephone: string;
                    role: string;
                    etablissementID: string | null;
                    estActif: boolean;
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
    getReceivedRejectedInvitations(req: any): Promise<({
        inviter: {
            utilisateurID: string;
            nom: string;
            prenom: string;
            username: string;
            password: string;
            email: string;
            telephone: string;
            role: string;
            etablissementID: string | null;
            estActif: boolean;
        };
        invitee: {
            utilisateurID: string;
            nom: string;
            prenom: string;
            username: string;
            password: string;
            email: string;
            telephone: string;
            role: string;
            etablissementID: string | null;
            estActif: boolean;
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
                    prenom: string;
                    email: string | null;
                    telephone: string;
                    adresse: string;
                    createdAt: Date;
                    updatedAt: Date;
                    createdBy: string;
                    patientID: string;
                    dateNaissance: Date;
                    genre: string;
                    groupeSanguin: string;
                };
                demandePar: {
                    utilisateurID: string;
                    nom: string;
                    prenom: string;
                    username: string;
                    password: string;
                    email: string;
                    telephone: string;
                    role: string;
                    etablissementID: string | null;
                    estActif: boolean;
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
    getSentInvitations(req: any): Promise<({
        inviter: {
            utilisateurID: string;
            nom: string;
            prenom: string;
            username: string;
            password: string;
            email: string;
            telephone: string;
            role: string;
            etablissementID: string | null;
            estActif: boolean;
        };
        invitee: {
            utilisateurID: string;
            nom: string;
            prenom: string;
            username: string;
            password: string;
            email: string;
            telephone: string;
            role: string;
            etablissementID: string | null;
            estActif: boolean;
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
                    prenom: string;
                    email: string | null;
                    telephone: string;
                    adresse: string;
                    createdAt: Date;
                    updatedAt: Date;
                    createdBy: string;
                    patientID: string;
                    dateNaissance: Date;
                    genre: string;
                    groupeSanguin: string;
                };
                demandePar: {
                    utilisateurID: string;
                    nom: string;
                    prenom: string;
                    username: string;
                    password: string;
                    email: string;
                    telephone: string;
                    role: string;
                    etablissementID: string | null;
                    estActif: boolean;
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
    getAllSentInvitations(req: any): Promise<({
        inviter: {
            utilisateurID: string;
            nom: string;
            prenom: string;
            username: string;
            password: string;
            email: string;
            telephone: string;
            role: string;
            etablissementID: string | null;
            estActif: boolean;
        };
        invitee: {
            utilisateurID: string;
            nom: string;
            prenom: string;
            username: string;
            password: string;
            email: string;
            telephone: string;
            role: string;
            etablissementID: string | null;
            estActif: boolean;
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
                    prenom: string;
                    email: string | null;
                    telephone: string;
                    adresse: string;
                    createdAt: Date;
                    updatedAt: Date;
                    createdBy: string;
                    patientID: string;
                    dateNaissance: Date;
                    genre: string;
                    groupeSanguin: string;
                };
                demandePar: {
                    utilisateurID: string;
                    nom: string;
                    prenom: string;
                    username: string;
                    password: string;
                    email: string;
                    telephone: string;
                    role: string;
                    etablissementID: string | null;
                    estActif: boolean;
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
    getActiveCollaborations(req: any): Promise<({
        inviter: {
            utilisateurID: string;
            nom: string;
            prenom: string;
            username: string;
            password: string;
            email: string;
            telephone: string;
            role: string;
            etablissementID: string | null;
            estActif: boolean;
        };
        invitee: {
            utilisateurID: string;
            nom: string;
            prenom: string;
            username: string;
            password: string;
            email: string;
            telephone: string;
            role: string;
            etablissementID: string | null;
            estActif: boolean;
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
                    prenom: string;
                    email: string | null;
                    telephone: string;
                    adresse: string;
                    createdAt: Date;
                    updatedAt: Date;
                    createdBy: string;
                    patientID: string;
                    dateNaissance: Date;
                    genre: string;
                    groupeSanguin: string;
                };
                demandePar: {
                    utilisateurID: string;
                    nom: string;
                    prenom: string;
                    username: string;
                    password: string;
                    email: string;
                    telephone: string;
                    role: string;
                    etablissementID: string | null;
                    estActif: boolean;
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
    inviteRadiologistToImage(imageID: string, inviteeID: string, req: any): Promise<{
        inviter: {
            utilisateurID: string;
            nom: string;
            prenom: string;
            email: string;
        };
        invitee: {
            utilisateurID: string;
            nom: string;
            prenom: string;
            email: string;
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
    inviteRadiologistToImageBySopInstanceUID(sopInstanceUID: string, inviteeID: string, req: any): Promise<{
        inviter: {
            utilisateurID: string;
            nom: string;
            prenom: string;
            email: string;
        };
        invitee: {
            utilisateurID: string;
            nom: string;
            prenom: string;
            email: string;
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
    acceptCollaborationInvitation(collaborationId: string, req: any): Promise<{
        inviter: {
            utilisateurID: string;
            nom: string;
            prenom: string;
            username: string;
            password: string;
            email: string;
            telephone: string;
            role: string;
            etablissementID: string | null;
            estActif: boolean;
        };
        invitee: {
            utilisateurID: string;
            nom: string;
            prenom: string;
            username: string;
            password: string;
            email: string;
            telephone: string;
            role: string;
            etablissementID: string | null;
            estActif: boolean;
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
                    prenom: string;
                    email: string | null;
                    telephone: string;
                    adresse: string;
                    createdAt: Date;
                    updatedAt: Date;
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
    rejectCollaborationInvitation(collaborationId: string, req: any): Promise<{
        inviter: {
            utilisateurID: string;
            nom: string;
            prenom: string;
            username: string;
            password: string;
            email: string;
            telephone: string;
            role: string;
            etablissementID: string | null;
            estActif: boolean;
        };
        invitee: {
            utilisateurID: string;
            nom: string;
            prenom: string;
            username: string;
            password: string;
            email: string;
            telephone: string;
            role: string;
            etablissementID: string | null;
            estActif: boolean;
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
                    prenom: string;
                    email: string | null;
                    telephone: string;
                    adresse: string;
                    createdAt: Date;
                    updatedAt: Date;
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
    getImageCollaborators(imageID: string): Promise<any[]>;
    getImageCollaboratorsBySopInstanceUID(sopInstanceUID: string): Promise<any[]>;
    getPendingCollaborationsBySopInstanceUID(sopInstanceUID: string): Promise<({
        inviter: {
            utilisateurID: string;
            nom: string;
            prenom: string;
            username: string;
            password: string;
            email: string;
            telephone: string;
            role: string;
            etablissementID: string | null;
            estActif: boolean;
        };
        invitee: {
            utilisateurID: string;
            nom: string;
            prenom: string;
            username: string;
            password: string;
            email: string;
            telephone: string;
            role: string;
            etablissementID: string | null;
            estActif: boolean;
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
                    prenom: string;
                    email: string | null;
                    telephone: string;
                    adresse: string;
                    createdAt: Date;
                    updatedAt: Date;
                    createdBy: string;
                    patientID: string;
                    dateNaissance: Date;
                    genre: string;
                    groupeSanguin: string;
                };
                demandePar: {
                    utilisateurID: string;
                    nom: string;
                    prenom: string;
                    username: string;
                    password: string;
                    email: string;
                    telephone: string;
                    role: string;
                    etablissementID: string | null;
                    estActif: boolean;
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
    sendMessageOnImage(imageID: string, createMessageDto: CreateChatMessageDto, req: any): Promise<{
        sender: {
            utilisateurID: string;
            nom: string;
            prenom: string;
            username: string;
            password: string;
            email: string;
            telephone: string;
            role: string;
            etablissementID: string | null;
            estActif: boolean;
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
                typeExamen: {
                    typeExamenID: string;
                    nomType: string;
                    description: string;
                    categorie: string;
                };
                patient: {
                    nom: string;
                    prenom: string;
                    email: string | null;
                    telephone: string;
                    adresse: string;
                    createdAt: Date;
                    updatedAt: Date;
                    createdBy: string;
                    patientID: string;
                    dateNaissance: Date;
                    genre: string;
                    groupeSanguin: string;
                };
                demandePar: {
                    utilisateurID: string;
                    nom: string;
                    prenom: string;
                    username: string;
                    password: string;
                    email: string;
                    telephone: string;
                    role: string;
                    etablissementID: string | null;
                    estActif: boolean;
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
            utilisateurID: string;
            nom: string;
            prenom: string;
            username: string;
            password: string;
            email: string;
            telephone: string;
            role: string;
            etablissementID: string | null;
            estActif: boolean;
        };
    } & {
        senderID: string;
        content: string;
        imageID: string;
        messageID: string;
        timestamp: Date;
    })[]>;
}
