import { PrismaService } from '../prisma/prisma.service';
import { CreateEtablissementDto, UpdateEtablissementDto, EtablissementDto } from './dto/etablissement.dto';
import { TypeEtablissement } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersService } from '../users/users.service';
export declare class EtablissementsService {
    private prisma;
    private notificationsService;
    private usersService;
    constructor(prisma: PrismaService, notificationsService: NotificationsService, usersService: UsersService);
    create(createEtablissementDto: CreateEtablissementDto): Promise<EtablissementDto>;
    findAll(): Promise<EtablissementDto[]>;
    findOne(id: string): Promise<EtablissementDto>;
    update(id: string, updateEtablissementDto: UpdateEtablissementDto): Promise<EtablissementDto>;
    remove(id: string): Promise<void>;
    findByRegion(region: string): Promise<EtablissementDto[]>;
    findByType(type: TypeEtablissement): Promise<EtablissementDto[]>;
    private mapToDto;
    private notifySuperAdmins;
}
