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
    findOne(id: string): Promise<{
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
    update(id: string, updatePatientDto: UpdatePatientDto, req: Request): Promise<{
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
    remove(id: string): Promise<void>;
    createMedicalRecord(id: string, createMedicalRecordDto: CreateMedicalRecordDto, req: any): Promise<{
        createdAt: Date;
        patientID: string;
        createdBy: string;
        dossierID: string;
        dateCreation: Date;
        etatDossier: string;
    }>;
    getMedicalRecord(id: string): Promise<{
        createdAt: Date;
        patientID: string;
        createdBy: string;
        dossierID: string;
        dateCreation: Date;
        etatDossier: string;
    } | null>;
    updateMedicalRecord(id: string, updateMedicalRecordDto: CreateMedicalRecordDto): Promise<{
        createdAt: Date;
        patientID: string;
        createdBy: string;
        dossierID: string;
        dateCreation: Date;
        etatDossier: string;
    }>;
}
