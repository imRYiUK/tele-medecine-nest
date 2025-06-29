import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
export declare class PatientsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPatientDto: CreatePatientDto, userId: string): Promise<{
        dossierMedical: {
            createdAt: Date;
            createdBy: string;
            dateCreation: Date;
            dossierID: string;
            patientID: string;
            etatDossier: string;
        } | null;
    } & {
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
    }>;
    findAll(): Promise<({
        examens: {
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
        }[];
        dossierMedical: {
            createdAt: Date;
            createdBy: string;
            dateCreation: Date;
            dossierID: string;
            patientID: string;
            etatDossier: string;
        } | null;
    } & {
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
    })[]>;
    findOne(patientID: string): Promise<{
        examens: {
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
        }[];
        dossierMedical: {
            createdAt: Date;
            createdBy: string;
            dateCreation: Date;
            dossierID: string;
            patientID: string;
            etatDossier: string;
        } | null;
    } & {
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
    }>;
    update(patientID: string, updatePatientDto: UpdatePatientDto): Promise<{
        dossierMedical: {
            createdAt: Date;
            createdBy: string;
            dateCreation: Date;
            dossierID: string;
            patientID: string;
            etatDossier: string;
        } | null;
    } & {
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
    }>;
    remove(patientID: string): Promise<void>;
    createMedicalRecord(patientID: string, createMedicalRecordDto: CreateMedicalRecordDto, userId: string): Promise<{
        createdAt: Date;
        createdBy: string;
        dateCreation: Date;
        dossierID: string;
        patientID: string;
        etatDossier: string;
    }>;
    getMedicalRecord(patientID: string): Promise<{
        createdAt: Date;
        createdBy: string;
        dateCreation: Date;
        dossierID: string;
        patientID: string;
        etatDossier: string;
    } | null>;
    updateMedicalRecord(patientID: string, updateMedicalRecordDto: CreateMedicalRecordDto): Promise<{
        createdAt: Date;
        createdBy: string;
        dateCreation: Date;
        dossierID: string;
        patientID: string;
        etatDossier: string;
    }>;
}
