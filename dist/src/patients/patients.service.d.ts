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
            patientID: string;
            createdBy: string;
            dossierID: string;
            dateCreation: Date;
            etatDossier: string;
        } | null;
    } & {
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
    }>;
    findAll(): Promise<({
        consultations: {
            createdAt: Date;
            updatedAt: Date;
            patientID: string;
            dossierID: string;
            consultationID: string;
            medecinID: string;
            dateConsultation: Date;
            motif: string;
            diagnostics: string;
            observations: string;
            traitementPrescrit: string;
            estTelemedicine: boolean;
            lienVisio: string | null;
        }[];
        dossierMedical: {
            createdAt: Date;
            patientID: string;
            createdBy: string;
            dossierID: string;
            dateCreation: Date;
            etatDossier: string;
        } | null;
        examens: {
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
        }[];
    } & {
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
    })[]>;
    findOne(patientID: string): Promise<{
        consultations: {
            createdAt: Date;
            updatedAt: Date;
            patientID: string;
            dossierID: string;
            consultationID: string;
            medecinID: string;
            dateConsultation: Date;
            motif: string;
            diagnostics: string;
            observations: string;
            traitementPrescrit: string;
            estTelemedicine: boolean;
            lienVisio: string | null;
        }[];
        dossierMedical: {
            createdAt: Date;
            patientID: string;
            createdBy: string;
            dossierID: string;
            dateCreation: Date;
            etatDossier: string;
        } | null;
        examens: {
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
        }[];
    } & {
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
    }>;
    update(patientID: string, updatePatientDto: UpdatePatientDto): Promise<{
        dossierMedical: {
            createdAt: Date;
            patientID: string;
            createdBy: string;
            dossierID: string;
            dateCreation: Date;
            etatDossier: string;
        } | null;
    } & {
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
    }>;
    remove(patientID: string): Promise<void>;
    createMedicalRecord(patientID: string, createMedicalRecordDto: CreateMedicalRecordDto, userId: string): Promise<{
        createdAt: Date;
        patientID: string;
        createdBy: string;
        dossierID: string;
        dateCreation: Date;
        etatDossier: string;
    }>;
    getMedicalRecord(patientID: string): Promise<{
        createdAt: Date;
        patientID: string;
        createdBy: string;
        dossierID: string;
        dateCreation: Date;
        etatDossier: string;
    } | null>;
    updateMedicalRecord(patientID: string, updateMedicalRecordDto: CreateMedicalRecordDto): Promise<{
        createdAt: Date;
        patientID: string;
        createdBy: string;
        dossierID: string;
        dateCreation: Date;
        etatDossier: string;
    }>;
}
