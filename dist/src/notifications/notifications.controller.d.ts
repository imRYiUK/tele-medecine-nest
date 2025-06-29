import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class NotificationsController {
    private readonly notificationsService;
    private readonly prisma;
    constructor(notificationsService: NotificationsService, prisma: PrismaService);
    private getUserId;
    create(createNotificationDto: CreateNotificationDto, req: any): Promise<{
        recipients: {
            utilisateurID: string;
            id: string;
            estLu: boolean;
            notificationID: string;
            dateLecture: Date | null;
        }[];
        type: string | null;
        message: string;
        createdByID: string;
        titre: string;
        lien: string | null;
        notificationID: string;
        dateCreation: Date;
    } | null>;
    createTestNotification(req: any): Promise<{
        recipients: {
            utilisateurID: string;
            id: string;
            estLu: boolean;
            notificationID: string;
            dateLecture: Date | null;
        }[];
        type: string | null;
        message: string;
        createdByID: string;
        titre: string;
        lien: string | null;
        notificationID: string;
        dateCreation: Date;
    } | null>;
    findAll(req: any): Promise<({
        notification: {
            createdBy: {
                utilisateurID: string;
                nom: string;
                prenom: string;
                email: string;
            };
        } & {
            type: string | null;
            message: string;
            createdByID: string;
            titre: string;
            lien: string | null;
            notificationID: string;
            dateCreation: Date;
        };
    } & {
        utilisateurID: string;
        id: string;
        estLu: boolean;
        notificationID: string;
        dateLecture: Date | null;
    })[]>;
    findUnread(req: any): Promise<({
        notification: {
            createdBy: {
                utilisateurID: string;
                nom: string;
                prenom: string;
                email: string;
            };
        } & {
            type: string | null;
            message: string;
            createdByID: string;
            titre: string;
            lien: string | null;
            notificationID: string;
            dateCreation: Date;
        };
    } & {
        utilisateurID: string;
        id: string;
        estLu: boolean;
        notificationID: string;
        dateLecture: Date | null;
    })[]>;
    markAllAsRead(req: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    markAsRead(id: string, req: any): Promise<{
        utilisateurID: string;
        id: string;
        estLu: boolean;
        notificationID: string;
        dateLecture: Date | null;
    }>;
    remove(id: string, req: any): Promise<{
        utilisateurID: string;
        id: string;
        estLu: boolean;
        notificationID: string;
        dateLecture: Date | null;
    }>;
    testChatNotification(req: any, body: {
        imageID: string;
        message: string;
    }): Promise<{
        message: string;
        sender: {
            id: string;
            name: string;
        };
        totalCollaborators: number;
        notificationsSent: number;
        notificationsSkipped: number;
        details: {
            sent: {
                recipient: any;
                reason: string;
            }[];
            skipped: {
                recipient: any;
                reason: string;
            }[];
        };
    }>;
}
