import { RendezVousService } from './rendez-vous.service';
import { UpdateRendezVousDto } from './dto/update-rendez-vous.dto';
export declare class RendezVousController {
    private readonly rendezVousService;
    constructor(rendezVousService: RendezVousService);
    create(body: any, req: any): Promise<import("./dto/rendez-vous.dto").RendezVousDto>;
    findAll(): Promise<import("./dto/rendez-vous.dto").RendezVousDto[]>;
    findByMedecin(medecinID: string): Promise<import("./dto/rendez-vous.dto").RendezVousDto[]>;
    findByPatient(patientID: string): Promise<import("./dto/rendez-vous.dto").RendezVousDto[]>;
    update(id: string, body: UpdateRendezVousDto): Promise<import("./dto/rendez-vous.dto").RendezVousDto>;
    remove(id: string): Promise<import("./dto/rendez-vous.dto").RendezVousDto>;
}
