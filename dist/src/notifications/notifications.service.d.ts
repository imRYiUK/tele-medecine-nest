import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsGateway } from './notifications.gateway';
export declare class NotificationsService {
    private prisma;
    private notificationsGateway;
    constructor(prisma: PrismaService, notificationsGateway: NotificationsGateway);
    create(createNotificationDto: CreateNotificationDto, createdByID: string): Promise<{
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
    findAll(userId: string): Promise<({
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
    findUnread(userId: string): Promise<({
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
    private verifyNotificationOwnership;
    markAsRead(notificationId: string, userId: string): Promise<{
        utilisateurID: string;
        id: string;
        estLu: boolean;
        notificationID: string;
        dateLecture: Date | null;
    }>;
    markAllAsRead(userId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    remove(notificationId: string, userId: string): Promise<{
        utilisateurID: string;
        id: string;
        estLu: boolean;
        notificationID: string;
        dateLecture: Date | null;
    }>;
}
