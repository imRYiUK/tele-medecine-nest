import { PrismaService } from '../prisma/prisma.service';
import { MedicamentDto } from './dto/medicament.dto';
export declare class MedicamentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<MedicamentDto[]>;
    findOne(medicamentID: string): Promise<MedicamentDto>;
    searchByName(searchTerm: string): Promise<MedicamentDto[]>;
    searchByNameStartsWith(searchTerm: string): Promise<MedicamentDto[]>;
    getRandomMedicaments(limit?: number): Promise<MedicamentDto[]>;
}
