import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { FindPatientsDto } from './dto/find-patients.dto';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
export declare class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    create(createPatientDto: CreatePatientDto, req: any): Promise<{
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
    findAll(query: FindPatientsDto): Promise<{
        data: ({
            _count: {
                consultations: number;
            };
            creator: {
                email: string;
                utilisateurID: string;
            };
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
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        consultations: ({
            medecin: {
                email: string;
                utilisateurID: string;
            };
        } & {
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
        })[];
        creator: {
            email: string;
            utilisateurID: string;
        };
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
    update(id: string, updatePatientDto: UpdatePatientDto, req: any): Promise<{
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
    remove(id: string): Promise<{
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
}
export declare class MedicalRecordsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    create(createMedicalRecordDto: CreateMedicalRecordDto, req: any): Promise<{
        patientID: string;
        createdBy: string;
        createdAt: Date;
        dossierID: string;
        dateCreation: Date;
        etatDossier: string;
    }>;
}
