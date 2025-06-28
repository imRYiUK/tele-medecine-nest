import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { Request } from 'express';
export declare class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    private getUserId;
    create(createPatientDto: CreatePatientDto, req: Request): Promise<{
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
    })[]>;
    findOne(id: string): Promise<{
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
    }>;
    update(id: string, updatePatientDto: UpdatePatientDto, req: Request): Promise<{
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
    }>;
    remove(id: string): Promise<void>;
    createMedicalRecord(id: string, createMedicalRecordDto: CreateMedicalRecordDto, req: any): Promise<{
        createdAt: Date;
        createdBy: string;
        dateCreation: Date;
        dossierID: string;
        patientID: string;
        etatDossier: string;
    }>;
    getMedicalRecord(id: string): Promise<{
        createdAt: Date;
        createdBy: string;
        dateCreation: Date;
        dossierID: string;
        patientID: string;
        etatDossier: string;
    } | null>;
    updateMedicalRecord(id: string, updateMedicalRecordDto: CreateMedicalRecordDto): Promise<{
        createdAt: Date;
        createdBy: string;
        dateCreation: Date;
        dossierID: string;
        patientID: string;
        etatDossier: string;
    }>;
}
