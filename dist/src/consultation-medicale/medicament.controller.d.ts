import { MedicamentService } from './medicament.service';
import { MedicamentDto } from './dto/medicament.dto';
export declare class MedicamentController {
    private readonly medicamentService;
    constructor(medicamentService: MedicamentService);
    findAll(): Promise<MedicamentDto[]>;
    searchByName(searchTerm: string): Promise<MedicamentDto[]>;
    searchByNameStartsWith(searchTerm: string): Promise<MedicamentDto[]>;
    getRandomMedicaments(limit?: string): Promise<MedicamentDto[]>;
    findOne(medicamentID: string): Promise<MedicamentDto>;
}
