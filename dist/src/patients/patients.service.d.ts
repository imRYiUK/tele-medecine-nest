import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
export declare class PatientsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPatientDto: CreatePatientDto, userId: string): Promise<{
        dossierMedical: {
            patientID: string;
            createdBy: string;
            createdAt: Date;
            dossierID: string;
            dateCreation: Date;
            etatDossier: string;
        } | null;
    } & {
        nom: string;
        adresse: string;
        telephone: string;
        email: string | null;
        prenom: string;
        patientID: string;
        dateNaissance: Date;
        genre: string;
        assuranceMaladie: string;
        groupeSanguin: string;
        createdBy: string;
        updatedAt: Date;
        createdAt: Date;
    }>;
    findAll(): Promise<({
        consultations: {
            patientID: string;
            updatedAt: Date;
            createdAt: Date;
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
            patientID: string;
            createdBy: string;
            createdAt: Date;
            dossierID: string;
            dateCreation: Date;
            etatDossier: string;
        } | null;
        examens: {
            patientID: string;
            dossierID: string;
            typeExamenID: string;
            description: string;
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
        prenom: string;
        patientID: string;
        dateNaissance: Date;
        genre: string;
        assuranceMaladie: string;
        groupeSanguin: string;
        createdBy: string;
        updatedAt: Date;
        createdAt: Date;
    })[]>;
    findOne(patientID: string): Promise<{
        consultations: {
            patientID: string;
            updatedAt: Date;
            createdAt: Date;
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
            patientID: string;
            createdBy: string;
            createdAt: Date;
            dossierID: string;
            dateCreation: Date;
            etatDossier: string;
        } | null;
        examens: {
            patientID: string;
            dossierID: string;
            typeExamenID: string;
            description: string;
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
        prenom: string;
        patientID: string;
        dateNaissance: Date;
        genre: string;
        assuranceMaladie: string;
        groupeSanguin: string;
        createdBy: string;
        updatedAt: Date;
        createdAt: Date;
    }>;
    update(patientID: string, updatePatientDto: UpdatePatientDto): Promise<{
        dossierMedical: {
            patientID: string;
            createdBy: string;
            createdAt: Date;
            dossierID: string;
            dateCreation: Date;
            etatDossier: string;
        } | null;
    } & {
        nom: string;
        adresse: string;
        telephone: string;
        email: string | null;
        prenom: string;
        patientID: string;
        dateNaissance: Date;
        genre: string;
        assuranceMaladie: string;
        groupeSanguin: string;
        createdBy: string;
        updatedAt: Date;
        createdAt: Date;
    }>;
    remove(patientID: string): Promise<void>;
    createMedicalRecord(patientID: string, createMedicalRecordDto: CreateMedicalRecordDto, userId: string): Promise<{
        patientID: string;
        createdBy: string;
        createdAt: Date;
        dossierID: string;
        dateCreation: Date;
        etatDossier: string;
    }>;
    getMedicalRecord(patientID: string): Promise<{
        patientID: string;
        createdBy: string;
        createdAt: Date;
        dossierID: string;
        dateCreation: Date;
        etatDossier: string;
    } | null>;
    updateMedicalRecord(patientID: string, updateMedicalRecordDto: CreateMedicalRecordDto): Promise<{
        patientID: string;
        createdBy: string;
        createdAt: Date;
        dossierID: string;
        dateCreation: Date;
        etatDossier: string;
    }>;
}
