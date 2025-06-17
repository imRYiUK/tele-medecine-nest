import { ConsultationMedicaleService } from './consultation-medicale.service';
import { CreateConsultationMedicaleDto } from './dto/create-consultation-medicale.dto';
import { UpdateConsultationMedicaleDto } from './dto/update-consultation-medicale.dto';
export declare class ConsultationMedicaleController {
    private readonly consultationMedicaleService;
    constructor(consultationMedicaleService: ConsultationMedicaleService);
    create(createConsultationMedicaleDto: CreateConsultationMedicaleDto, req: any): Promise<{
        patient: {
            nom: string;
            prenom: string;
            dateNaissance: Date;
        };
        medecin: {
            nom: string;
            prenom: string;
            role: string;
        };
        ordonnances: ({
            prescriptions: ({
                medicament: {
                    nom: string;
                    description: string | null;
                    medicamentID: string;
                    dosage: string;
                    forme: string;
                };
            } & {
                medicamentID: string;
                ordonnanceID: string;
                prescriptionID: string;
                posologie: string;
                duree: string;
                instructions: string;
            })[];
        } & {
            consultationID: string;
            ordonnanceID: string;
            dateEmission: Date;
            dateExpiration: Date;
            estRenouvelable: boolean;
        })[];
    } & {
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
    }>;
    findAll(): Promise<({
        patient: {
            nom: string;
            prenom: string;
            dateNaissance: Date;
        };
        medecin: {
            nom: string;
            prenom: string;
            role: string;
        };
        ordonnances: ({
            prescriptions: ({
                medicament: {
                    nom: string;
                    description: string | null;
                    medicamentID: string;
                    dosage: string;
                    forme: string;
                };
            } & {
                medicamentID: string;
                ordonnanceID: string;
                prescriptionID: string;
                posologie: string;
                duree: string;
                instructions: string;
            })[];
        } & {
            consultationID: string;
            ordonnanceID: string;
            dateEmission: Date;
            dateExpiration: Date;
            estRenouvelable: boolean;
        })[];
    } & {
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
    })[]>;
    findOne(id: string): Promise<{
        patient: {
            nom: string;
            prenom: string;
            dateNaissance: Date;
        };
        medecin: {
            nom: string;
            prenom: string;
            role: string;
        };
        ordonnances: ({
            prescriptions: ({
                medicament: {
                    nom: string;
                    description: string | null;
                    medicamentID: string;
                    dosage: string;
                    forme: string;
                };
            } & {
                medicamentID: string;
                ordonnanceID: string;
                prescriptionID: string;
                posologie: string;
                duree: string;
                instructions: string;
            })[];
        } & {
            consultationID: string;
            ordonnanceID: string;
            dateEmission: Date;
            dateExpiration: Date;
            estRenouvelable: boolean;
        })[];
    } & {
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
    }>;
    update(id: string, updateConsultationMedicaleDto: UpdateConsultationMedicaleDto): Promise<{
        patient: {
            nom: string;
            prenom: string;
            dateNaissance: Date;
        };
        medecin: {
            nom: string;
            prenom: string;
            role: string;
        };
        ordonnances: ({
            prescriptions: ({
                medicament: {
                    nom: string;
                    description: string | null;
                    medicamentID: string;
                    dosage: string;
                    forme: string;
                };
            } & {
                medicamentID: string;
                ordonnanceID: string;
                prescriptionID: string;
                posologie: string;
                duree: string;
                instructions: string;
            })[];
        } & {
            consultationID: string;
            ordonnanceID: string;
            dateEmission: Date;
            dateExpiration: Date;
            estRenouvelable: boolean;
        })[];
    } & {
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
    }>;
    remove(id: string): Promise<{
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
    }>;
    findByPatient(patientId: string): Promise<({
        medecin: {
            nom: string;
            prenom: string;
            role: string;
        };
        ordonnances: ({
            prescriptions: ({
                medicament: {
                    nom: string;
                    description: string | null;
                    medicamentID: string;
                    dosage: string;
                    forme: string;
                };
            } & {
                medicamentID: string;
                ordonnanceID: string;
                prescriptionID: string;
                posologie: string;
                duree: string;
                instructions: string;
            })[];
        } & {
            consultationID: string;
            ordonnanceID: string;
            dateEmission: Date;
            dateExpiration: Date;
            estRenouvelable: boolean;
        })[];
    } & {
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
    })[]>;
    findByDossier(dossierId: string): Promise<({
        medecin: {
            nom: string;
            prenom: string;
            role: string;
        };
        ordonnances: ({
            prescriptions: ({
                medicament: {
                    nom: string;
                    description: string | null;
                    medicamentID: string;
                    dosage: string;
                    forme: string;
                };
            } & {
                medicamentID: string;
                ordonnanceID: string;
                prescriptionID: string;
                posologie: string;
                duree: string;
                instructions: string;
            })[];
        } & {
            consultationID: string;
            ordonnanceID: string;
            dateEmission: Date;
            dateExpiration: Date;
            estRenouvelable: boolean;
        })[];
    } & {
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
    })[]>;
    findByMedecin(medecinId: string): Promise<({
        patient: {
            nom: string;
            prenom: string;
            dateNaissance: Date;
        };
        ordonnances: ({
            prescriptions: ({
                medicament: {
                    nom: string;
                    description: string | null;
                    medicamentID: string;
                    dosage: string;
                    forme: string;
                };
            } & {
                medicamentID: string;
                ordonnanceID: string;
                prescriptionID: string;
                posologie: string;
                duree: string;
                instructions: string;
            })[];
        } & {
            consultationID: string;
            ordonnanceID: string;
            dateEmission: Date;
            dateExpiration: Date;
            estRenouvelable: boolean;
        })[];
    } & {
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
    })[]>;
}
