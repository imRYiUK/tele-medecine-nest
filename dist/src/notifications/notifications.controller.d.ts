import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
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
    findAll(req: any): Promise<{
        type: string | null;
        utilisateurID: string;
        dateCreation: Date;
        message: string;
        titre: string;
        lien: string | null;
        estLu: boolean;
        notificationID: string;
    }[]>;
    findUnread(req: any): Promise<{
        type: string | null;
        utilisateurID: string;
        dateCreation: Date;
        message: string;
        titre: string;
        lien: string | null;
        estLu: boolean;
        notificationID: string;
    }[]>;
    markAsRead(id: string): Promise<{
        type: string | null;
        utilisateurID: string;
        dateCreation: Date;
        message: string;
        titre: string;
        lien: string | null;
        estLu: boolean;
        notificationID: string;
    }>;
    markAllAsRead(req: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    remove(id: string): Promise<{
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
