import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { FindPatientsDto } from './dto/find-patients.dto';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { JournalActivityService } from '../journal/journal-activity.service';
export declare class PatientsService {
    private prisma;
    private journalActivityService;
    constructor(prisma: PrismaService, journalActivityService: JournalActivityService);
    create(createPatientDto: CreatePatientDto, userId: string): Promise<{
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
    findAll(params: FindPatientsDto): Promise<{
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
    findOne(patientID: string): Promise<{
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
    update(patientID: string, updatePatientDto: UpdatePatientDto, userId: number): Promise<{
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
    remove(patientID: string): Promise<{
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
    createMedicalRecord(createMedicalRecordDto: CreateMedicalRecordDto, userId: string): Promise<{
        patientID: string;
        createdBy: string;
        createdAt: Date;
        dossierID: string;
        dateCreation: Date;
        etatDossier: string;
    }>;
}
