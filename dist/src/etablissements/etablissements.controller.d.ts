import { EtablissementsService } from './etablissements.service';
import { CreateEtablissementDto, UpdateEtablissementDto, EtablissementDto } from './dto/etablissement.dto';
import { TypeEtablissement } from '@prisma/client';
export declare class EtablissementsController {
    private readonly etablissementsService;
    constructor(etablissementsService: EtablissementsService);
    create(createEtablissementDto: CreateEtablissementDto): Promise<EtablissementDto>;
    findAll(): Promise<EtablissementDto[]>;
    findByRegion(region: string): Promise<EtablissementDto[]>;
    findByType(type: TypeEtablissement): Promise<EtablissementDto[]>;
    findOne(id: string): Promise<EtablissementDto>;
    update(id: string, updateEtablissementDto: UpdateEtablissementDto): Promise<EtablissementDto>;
    remove(id: string): Promise<void>;
}
