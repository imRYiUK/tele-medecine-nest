import { PrismaService } from '../prisma/prisma.service';
import { CreateExamenMedicalDto, UpdateExamenMedicalDto, ExamenMedicalListDto, CreateImageMedicaleDto, UpdateImageMedicaleDto, ImageMedicaleDto } from './dto';
import { NotificationsService } from '../notifications/notifications.service';
export declare class ExamenMedicalService {
    private prisma;
    private notificationsService;
    constructor(prisma: PrismaService, notificationsService: NotificationsService);
    create(createExamenMedicalDto: CreateExamenMedicalDto, demandeParID: string): Promise<{
        patient: {
            nom: string;
            prenom: string;
            dateNaissance: Date;
        };
        typeExamen: {
            description: string;
            typeExamenID: string;
            nomType: string;
            categorie: string;
        };
        demandePar: {
            nom: string;
            prenom: string;
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
    }>;
    findAll(status?: string, category?: string, search?: string): Promise<({
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
        images: {
            description: string;
            examenID: string;
            url: string | null;
            imageID: string;
            studyInstanceUID: string;
            seriesInstanceUID: string;
            sopInstanceUID: string;
            dateAcquisition: Date;
            modalite: string;
        }[];
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
    })[]>;
    findOne(examenID: string): Promise<{
        patient: {
            nom: string;
            prenom: string;
            dateNaissance: Date;
        };
        typeExamen: {
            description: string;
            typeExamenID: string;
            nomType: string;
            categorie: string;
        };
        demandePar: {
            nom: string;
            prenom: string;
            role: string;
        };
        images: {
            description: string;
            examenID: string;
            url: string | null;
            imageID: string;
            studyInstanceUID: string;
            seriesInstanceUID: string;
            sopInstanceUID: string;
            dateAcquisition: Date;
            modalite: string;
        }[];
        radiologues: {
            nom: string;
            email: string;
            utilisateurID: string;
            prenom: string;
        }[];
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
    }>;
    update(examenID: string, updateExamenMedicalDto: UpdateExamenMedicalDto): Promise<{
        patient: {
            nom: string;
            prenom: string;
            dateNaissance: Date;
        };
        typeExamen: {
            description: string;
            typeExamenID: string;
            nomType: string;
            categorie: string;
        };
        demandePar: {
            nom: string;
            prenom: string;
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
    }>;
    remove(examenID: string): Promise<{
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
    }>;
    findByPatient(patientID: string): Promise<({
        typeExamen: {
            description: string;
            typeExamenID: string;
            nomType: string;
            categorie: string;
        };
        demandePar: {
            nom: string;
            prenom: string;
            role: string;
        };
        images: {
            description: string;
            examenID: string;
            url: string | null;
            imageID: string;
            studyInstanceUID: string;
            seriesInstanceUID: string;
            sopInstanceUID: string;
            dateAcquisition: Date;
            modalite: string;
        }[];
        radiologues: {
            nom: string;
            email: string;
            utilisateurID: string;
            prenom: string;
        }[];
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
    })[]>;
    findByDossier(dossierID: string): Promise<({
        typeExamen: {
            description: string;
            typeExamenID: string;
            nomType: string;
            categorie: string;
        };
        demandePar: {
            nom: string;
            prenom: string;
            role: string;
        };
        images: {
            description: string;
            examenID: string;
            url: string | null;
            imageID: string;
            studyInstanceUID: string;
            seriesInstanceUID: string;
            sopInstanceUID: string;
            dateAcquisition: Date;
            modalite: string;
        }[];
        radiologues: {
            nom: string;
            email: string;
            utilisateurID: string;
            prenom: string;
        }[];
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
    })[]>;
    inviteRadiologue(examenID: string, radiologueID: string): Promise<{
        radiologues: {
            nom: string;
            email: string;
            utilisateurID: string;
            prenom: string;
        }[];
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
    }>;
    getRadiologistStats(radiologueID: string): Promise<{
        examensEnAttente: number;
        examensEnCours: number;
        examensTermines: number;
        examensUrgents: number;
    }>;
    getRecentExams(radiologueID: string): Promise<({
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
        images: {
            description: string;
            examenID: string;
            url: string | null;
            imageID: string;
            studyInstanceUID: string;
            seriesInstanceUID: string;
            sopInstanceUID: string;
            dateAcquisition: Date;
            modalite: string;
        }[];
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
    })[]>;
    markAsAnalyzed(examenID: string, resultat: string): Promise<{
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
        images: {
            description: string;
            examenID: string;
            url: string | null;
            imageID: string;
            studyInstanceUID: string;
            seriesInstanceUID: string;
            sopInstanceUID: string;
            dateAcquisition: Date;
            modalite: string;
        }[];
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
    }>;
    getTypeExamens(): Promise<{
        description: string;
        typeExamenID: string;
        nomType: string;
        categorie: string;
    }[]>;
    createImage(createImageDto: CreateImageMedicaleDto): Promise<ImageMedicaleDto>;
    getImagesByExam(examenID: string): Promise<ImageMedicaleDto[]>;
    updateImage(imageID: string, updateImageDto: UpdateImageMedicaleDto): Promise<ImageMedicaleDto>;
    deleteImage(imageID: string): Promise<void>;
    getImageCountByExam(examenID: string): Promise<number>;
    getExamsWithImageCounts(etablissementID?: string): Promise<ExamenMedicalListDto[]>;
}
