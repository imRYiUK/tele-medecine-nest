import { RendezVousService } from './rendez-vous.service';
import { UpdateRendezVousDto } from './dto/update-rendez-vous.dto';
export declare class RendezVousController {
    private readonly rendezVousService;
    constructor(rendezVousService: RendezVousService);
    create(body: any, req: any): Promise<{
        createdAt: Date;
        patientID: string;
        medecinID: string;
        motif: string | null;
        rendezVousID: string;
        dateHeure: Date;
        createdByID: string;
    }>;
    findAll(): Promise<({
        patient: {
            nom: string;
            prenom: string;
        };
        createdBy: {
            nom: string;
            prenom: string;
        };
        medecin: {
            nom: string;
            email: string;
            prenom: string;
        };
    } & {
        createdAt: Date;
        patientID: string;
        medecinID: string;
        motif: string | null;
        rendezVousID: string;
        dateHeure: Date;
        createdByID: string;
    })[]>;
    findByMedecin(medecinID: string): Promise<({
        patient: {
            nom: string;
            prenom: string;
        };
    } & {
        createdAt: Date;
        patientID: string;
        medecinID: string;
        motif: string | null;
        rendezVousID: string;
        dateHeure: Date;
        createdByID: string;
    })[]>;
    findByPatient(patientID: string): Promise<({
        medecin: {
            nom: string;
            email: string;
            prenom: string;
        };
    } & {
        createdAt: Date;
        patientID: string;
        medecinID: string;
        motif: string | null;
        rendezVousID: string;
        dateHeure: Date;
        createdByID: string;
    })[]>;
    update(id: string, body: UpdateRendezVousDto): Promise<{
        createdAt: Date;
        patientID: string;
        medecinID: string;
        motif: string | null;
        rendezVousID: string;
        dateHeure: Date;
        createdByID: string;
    }>;
    remove(id: string): Promise<{
        createdAt: Date;
        patientID: string;
        medecinID: string;
        motif: string | null;
        rendezVousID: string;
        dateHeure: Date;
        createdByID: string;
    }>;
}
