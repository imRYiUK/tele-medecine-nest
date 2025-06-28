import { PrismaService } from '../prisma/prisma.service';
import { CreateExamenMedicalDto, UpdateExamenMedicalDto, ExamenMedicalListDto, CreateImageMedicaleDto, UpdateImageMedicaleDto, ImageMedicaleDto } from './dto';
import { NotificationsService } from '../notifications/notifications.service';
export declare class ExamenMedicalService {
    private prisma;
    private notificationsService;
    private readonly logger;
    constructor(prisma: PrismaService, notificationsService: NotificationsService);
    create(createExamenMedicalDto: CreateExamenMedicalDto, demandeParID: string): Promise<{
        typeExamen: {
            typeExamenID: string;
            nomType: string;
            description: string;
            categorie: string;
        };
        patient: {
            nom: string;
            prenom: string;
            dateNaissance: Date;
        };
        demandePar: {
            nom: string;
            prenom: string;
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
    }>;
    findAll(status?: string, category?: string, search?: string): Promise<({
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
        radiologues: {
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
        }[];
        images: {
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
        }[];
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
    })[]>;
    findOne(examenID: string): Promise<{
        typeExamen: {
            typeExamenID: string;
            nomType: string;
            description: string;
            categorie: string;
        };
        patient: {
            nom: string;
            prenom: string;
            dateNaissance: Date;
        };
        demandePar: {
            nom: string;
            prenom: string;
            role: string;
        };
        radiologues: {
            nom: string;
            email: string;
            utilisateurID: string;
            prenom: string;
        }[];
        images: {
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
        }[];
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
    }>;
    update(examenID: string, updateExamenMedicalDto: UpdateExamenMedicalDto, radiologistID?: string): Promise<{
        typeExamen: {
            typeExamenID: string;
            nomType: string;
            description: string;
            categorie: string;
        };
        patient: {
            nom: string;
            prenom: string;
            dateNaissance: Date;
        };
        demandePar: {
            nom: string;
            prenom: string;
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
    }>;
    remove(examenID: string): Promise<{
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
    }>;
    findByPatient(patientID: string): Promise<({
        typeExamen: {
            typeExamenID: string;
            nomType: string;
            description: string;
            categorie: string;
        };
        demandePar: {
            nom: string;
            prenom: string;
            role: string;
        };
        radiologues: {
            nom: string;
            email: string;
            utilisateurID: string;
            prenom: string;
        }[];
        images: {
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
        }[];
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
    })[]>;
    findByDossier(dossierID: string): Promise<({
        typeExamen: {
            typeExamenID: string;
            nomType: string;
            description: string;
            categorie: string;
        };
        demandePar: {
            nom: string;
            prenom: string;
            role: string;
        };
        radiologues: {
            nom: string;
            email: string;
            utilisateurID: string;
            prenom: string;
        }[];
        images: {
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
        }[];
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
    })[]>;
    inviteRadiologue(examenID: string, radiologueID: string): Promise<{
        radiologues: {
            nom: string;
            email: string;
            utilisateurID: string;
            prenom: string;
        }[];
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
    }>;
    getRadiologistStats(radiologueID: string): Promise<{
        examensEnAttente: number;
        examensEnCours: number;
        examensTermines: number;
        examensUrgents: number;
    }>;
    getRecentExams(radiologueID: string): Promise<({
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
        radiologues: {
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
        }[];
        images: {
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
        }[];
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
    })[]>;
    markAsAnalyzed(examenID: string, resultat: string, radiologistID: string): Promise<{
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
        radiologues: {
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
        }[];
        images: {
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
        }[];
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
    }>;
    getTypeExamens(): Promise<{
        typeExamenID: string;
        nomType: string;
        description: string;
        categorie: string;
    }[]>;
    createImage(createImageDto: CreateImageMedicaleDto, radiologistID?: string): Promise<ImageMedicaleDto>;
    getImagesByExam(examenID: string): Promise<ImageMedicaleDto[]>;
    updateImage(imageID: string, updateImageDto: UpdateImageMedicaleDto, radiologistID?: string): Promise<ImageMedicaleDto>;
    deleteImage(imageID: string, radiologistID?: string): Promise<void>;
    getImageCountByExam(examenID: string): Promise<number>;
    findImageBySopInstanceUID(sopInstanceUID: string): Promise<ImageMedicaleDto>;
    getExamsWithImageCounts(etablissementID?: string): Promise<ExamenMedicalListDto[]>;
    getRadiologistExamsWithImageCounts(radiologueID: string, etablissementID?: string): Promise<ExamenMedicalListDto[]>;
    canRadiologistEditExam(examenID: string, radiologistID: string): Promise<boolean>;
    checkRadiologistPermissions(examenID: string, radiologistID: string): Promise<void>;
}
