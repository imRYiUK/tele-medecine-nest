import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createNotificationDto: CreateNotificationDto): Promise<{
        type: string | null;
        utilisateurID: string;
        dateCreation: Date;
        message: string;
        titre: string;
        lien: string | null;
        estLu: boolean;
        notificationID: string;
    }>;
    findAll(userId: string): Promise<{
        type: string | null;
        utilisateurID: string;
        dateCreation: Date;
        message: string;
        titre: string;
        lien: string | null;
        estLu: boolean;
        notificationID: string;
    }[]>;
    findUnread(userId: string): Promise<{
        type: string | null;
        utilisateurID: string;
        dateCreation: Date;
        message: string;
        titre: string;
        lien: string | null;
        estLu: boolean;
        notificationID: string;
    }[]>;
    markAsRead(notificationId: string): Promise<{
        type: string | null;
        utilisateurID: string;
        dateCreation: Date;
        message: string;
        titre: string;
        lien: string | null;
        estLu: boolean;
        notificationID: string;
    }>;
    markAllAsRead(userId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    remove(notificationId: string): Promise<{
        type: string | null;
        utilisateurID: string;
        dateCreation: Date;
        message: string;
        titre: string;
        lien: string | null;
        estLu: boolean;
        notificationID: string;
    }>;
}
