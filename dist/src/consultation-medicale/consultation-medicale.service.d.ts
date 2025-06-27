import { PrismaService } from '../prisma/prisma.service';
import { CreateConsultationMedicaleDto } from './dto/create-consultation-medicale.dto';
import { UpdateConsultationMedicaleDto } from './dto/update-consultation-medicale.dto';
import { NotificationsService } from '../notifications/notifications.service';
export declare class ConsultationMedicaleService {
    private prisma;
    private notificationsService;
    constructor(prisma: PrismaService, notificationsService: NotificationsService);
    create(createConsultationMedicaleDto: CreateConsultationMedicaleDto): Promise<{
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
    findOne(consultationID: string): Promise<{
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
    update(consultationID: string, updateConsultationMedicaleDto: UpdateConsultationMedicaleDto): Promise<{
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
    remove(consultationID: string): Promise<{
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
    findByPatient(patientID: string): Promise<({
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
    findByDossier(dossierID: string): Promise<({
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
    findByMedecin(medecinID: string): Promise<({
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
