import { ConsultationMedicaleService } from './consultation-medicale.service';
import { CreateConsultationMedicaleDto } from './dto/create-consultation-medicale.dto';
import { UpdateConsultationMedicaleDto } from './dto/update-consultation-medicale.dto';
export declare class ConsultationMedicaleController {
    private readonly consultationMedicaleService;
    constructor(consultationMedicaleService: ConsultationMedicaleService);
    create(createConsultationMedicaleDto: CreateConsultationMedicaleDto, req: any): Promise<{
        dossier: {
            patient: {
                nom: string;
                prenom: string;
                dateNaissance: Date;
            };
        } & {
            createdAt: Date;
            patientID: string;
            createdBy: string;
            dossierID: string;
            dateCreation: Date;
            etatDossier: string;
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
                    medicamentID: string;
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
        dossier: {
            patient: {
                nom: string;
                prenom: string;
                dateNaissance: Date;
            };
        } & {
            createdAt: Date;
            patientID: string;
            createdBy: string;
            dossierID: string;
            dateCreation: Date;
            etatDossier: string;
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
                    medicamentID: string;
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
        dossier: {
            patient: {
                nom: string;
                prenom: string;
                dateNaissance: Date;
            };
        } & {
            createdAt: Date;
            patientID: string;
            createdBy: string;
            dossierID: string;
            dateCreation: Date;
            etatDossier: string;
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
                    medicamentID: string;
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
        dossier: {
            patient: {
                nom: string;
                prenom: string;
                dateNaissance: Date;
            };
        } & {
            createdAt: Date;
            patientID: string;
            createdBy: string;
            dossierID: string;
            dateCreation: Date;
            etatDossier: string;
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
                    medicamentID: string;
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
        dossier: {
            patient: {
                nom: string;
                prenom: string;
                dateNaissance: Date;
            };
        } & {
            createdAt: Date;
            patientID: string;
            createdBy: string;
            dossierID: string;
            dateCreation: Date;
            etatDossier: string;
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
                    medicamentID: string;
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
    getConsultationCount(patientId: string): Promise<{
        count: number;
    }>;
    findByDossier(dossierId: string): Promise<({
        dossier: {
            patient: {
                nom: string;
                prenom: string;
                dateNaissance: Date;
            };
        } & {
            createdAt: Date;
            patientID: string;
            createdBy: string;
            dossierID: string;
            dateCreation: Date;
            etatDossier: string;
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
                    medicamentID: string;
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
        dossier: {
            patient: {
                nom: string;
                prenom: string;
                dateNaissance: Date;
            };
        } & {
            createdAt: Date;
            patientID: string;
            createdBy: string;
            dossierID: string;
            dateCreation: Date;
            etatDossier: string;
        };
        ordonnances: ({
            prescriptions: ({
                medicament: {
                    nom: string;
                    medicamentID: string;
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
