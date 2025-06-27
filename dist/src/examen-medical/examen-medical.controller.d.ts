import { ExamenMedicalService } from './examen-medical.service';
import { CreateExamenMedicalDto } from './dto/create-examen-medical.dto';
import { UpdateExamenMedicalDto } from './dto/update-examen-medical.dto';
export declare class ExamenMedicalController {
    private readonly examenMedicalService;
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
    findAll(): Promise<({
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
    update(id: string, updateExamenMedicalDto: UpdateExamenMedicalDto): Promise<{
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
}
