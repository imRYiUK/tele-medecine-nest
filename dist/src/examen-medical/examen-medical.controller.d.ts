import { ExamenMedicalService } from './examen-medical.service';
import { CreateExamenMedicalDto, UpdateExamenMedicalDto, CreateImageMedicaleDto, UpdateImageMedicaleDto, ExamenMedicalListDto, ImageMedicaleDto } from './dto';
export declare class ExamenMedicalController {
    private readonly examenMedicalService;
    private readonly logger;
    constructor(examenMedicalService: ExamenMedicalService);
    create(createExamenMedicalDto: CreateExamenMedicalDto, req: any): Promise<{
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
    getExamsWithImageCounts(etablissementID?: string): Promise<ExamenMedicalListDto[]>;
    getRadiologistExamsWithImageCounts(etablissementID?: string, req?: any): Promise<ExamenMedicalListDto[]>;
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
            orthancInstanceId: string | null;
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
    getTypeExamens(): Promise<{
        description: string;
        typeExamenID: string;
        nomType: string;
        categorie: string;
    }[]>;
    canEditExam(examenID: string, req: any): Promise<boolean>;
    findOne(id: string): Promise<{
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
            orthancInstanceId: string | null;
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
    update(id: string, updateExamenMedicalDto: UpdateExamenMedicalDto, req: any): Promise<{
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
    remove(id: string): Promise<{
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
            orthancInstanceId: string | null;
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
            orthancInstanceId: string | null;
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
    getRadiologistStats(req: any): Promise<{
        examensEnAttente: number;
        examensEnCours: number;
        examensTermines: number;
        examensUrgents: number;
    }>;
    getRecentExams(req: any): Promise<({
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
            orthancInstanceId: string | null;
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
    markAsAnalyzed(examenID: string, resultat: {
        resultat: string;
    }, req: any): Promise<{
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
            orthancInstanceId: string | null;
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
    getImagesByExam(examenID: string): Promise<ImageMedicaleDto[]>;
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
