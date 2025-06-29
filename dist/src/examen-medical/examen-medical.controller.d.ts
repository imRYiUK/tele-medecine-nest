import { ExamenMedicalService } from './examen-medical.service';
import { CreateExamenMedicalDto, UpdateExamenMedicalDto, CreateImageMedicaleDto, UpdateImageMedicaleDto, ExamenMedicalListDto, ImageMedicaleDto } from './dto';
export declare class ExamenMedicalController {
    private readonly examenMedicalService;
    private readonly logger;
    constructor(examenMedicalService: ExamenMedicalService);
    create(createExamenMedicalDto: CreateExamenMedicalDto, req: any): Promise<{
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
    getExamsWithImageCounts(etablissementID?: string): Promise<ExamenMedicalListDto[]>;
    getRadiologistExamsWithImageCounts(req?: any): Promise<ExamenMedicalListDto[]>;
    findAll(status?: string, category?: string, search?: string): Promise<({
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
        radiologues: {
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
    getTypeExamens(): Promise<{
        typeExamenID: string;
        nomType: string;
        description: string;
        categorie: string;
    }[]>;
    canEditExam(examenID: string, req: any): Promise<boolean>;
    findOne(id: string, req: any): Promise<{
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
            utilisateurID: string;
            nom: string;
            prenom: string;
            email: string;
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
    update(id: string, updateExamenMedicalDto: UpdateExamenMedicalDto, req: any): Promise<{
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
    remove(id: string): Promise<{
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
            utilisateurID: string;
            nom: string;
            prenom: string;
            email: string;
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
            utilisateurID: string;
            nom: string;
            prenom: string;
            email: string;
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
            utilisateurID: string;
            nom: string;
            prenom: string;
            email: string;
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
    getRadiologistStats(req: any): Promise<{
        examensEnAttente: number;
        examensEnCours: number;
        examensTermines: number;
        examensUrgents: number;
    }>;
    getRecentExams(req: any): Promise<({
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
        radiologues: {
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
    markAsAnalyzed(examenID: string, resultat: {
        resultat: string;
    }, req: any): Promise<{
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
        radiologues: {
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
    getImagesByExam(examenID: string, req: any): Promise<ImageMedicaleDto[]>;
    getImageCountByExam(examenID: string): Promise<number>;
    testImageExists(sopInstanceUID: string): Promise<{
        exists: boolean;
        imageID: string;
        sopInstanceUID: string;
        message: string;
    } | {
        exists: boolean;
        message: any;
        imageID?: undefined;
        sopInstanceUID?: undefined;
    }>;
    getImageBySopInstanceUID(sopInstanceUID: string): Promise<ImageMedicaleDto>;
    createImage(createImageDto: CreateImageMedicaleDto, req: any): Promise<ImageMedicaleDto>;
    updateImage(imageID: string, updateImageDto: UpdateImageMedicaleDto, req: any): Promise<ImageMedicaleDto>;
    deleteImage(imageID: string, req: any): Promise<void>;
}
