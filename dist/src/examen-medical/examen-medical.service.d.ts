import { PrismaService } from '../prisma/prisma.service';
import { CreateExamenMedicalDto } from './dto/create-examen-medical.dto';
import { UpdateExamenMedicalDto } from './dto/update-examen-medical.dto';
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
            imageID: string;
            studyInstanceUID: string;
            seriesInstanceUID: string;
            sopInstanceUID: string;
            dateAcquisition: Date;
            modalite: string;
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
            imageID: string;
            studyInstanceUID: string;
            seriesInstanceUID: string;
            sopInstanceUID: string;
            dateAcquisition: Date;
            modalite: string;
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
}
