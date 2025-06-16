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
    findOne(id: string): Promise<{
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
    update(id: string, updatePatientDto: UpdatePatientDto, req: Request): Promise<{
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
    remove(id: string): Promise<void>;
    createMedicalRecord(id: string, createMedicalRecordDto: CreateMedicalRecordDto, req: any): Promise<{
        patientID: string;
        createdBy: string;
        createdAt: Date;
        dossierID: string;
        dateCreation: Date;
        etatDossier: string;
    }>;
    getMedicalRecord(id: string): Promise<{
        patientID: string;
        createdBy: string;
        createdAt: Date;
        dossierID: string;
        dateCreation: Date;
        etatDossier: string;
    } | null>;
    updateMedicalRecord(id: string, updateMedicalRecordDto: CreateMedicalRecordDto): Promise<{
        patientID: string;
        createdBy: string;
        createdAt: Date;
        dossierID: string;
        dateCreation: Date;
        etatDossier: string;
    }>;
}
