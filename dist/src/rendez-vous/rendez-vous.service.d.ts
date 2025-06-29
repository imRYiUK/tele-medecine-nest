import { PrismaService } from '../prisma/prisma.service';
import { RendezVousDto } from './dto/rendez-vous.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersService } from '../users/users.service';
export declare class RendezVousService {
    private prisma;
    private notificationsService;
    private usersService;
    constructor(prisma: PrismaService, notificationsService: NotificationsService, usersService: UsersService);
    create(data: {
        date: string;
        debutTime: string;
        endTime: string;
        motif?: string;
        patientID: string;
        medecinID: string;
        createdByID: string;
    }): Promise<RendezVousDto>;
    findAll(): Promise<RendezVousDto[]>;
    findByMedecin(medecinID: string): Promise<RendezVousDto[]>;
    findByPatient(patientID: string): Promise<RendezVousDto[]>;
    update(id: string, data: Partial<{
        date: string;
        debutTime: string;
        endTime: string;
        motif: string;
        medecinID: string;
    }>): Promise<RendezVousDto>;
    remove(id: string): Promise<RendezVousDto>;
}
