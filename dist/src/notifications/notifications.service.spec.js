"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const notifications_service_1 = require("./notifications.service");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_gateway_1 = require("./notifications.gateway");
const common_1 = require("@nestjs/common");
describe('NotificationsService', () => {
    let service;
    let prismaService;
    let notificationsGateway;
    const mockPrismaService = {
        notification: {
            create: jest.fn(),
        },
        notificationRecipient: {
            findMany: jest.fn(),
            findFirst: jest.fn(),
            update: jest.fn(),
            updateMany: jest.fn(),
            delete: jest.fn(),
            create: jest.fn(),
        },
    };
    const mockNotificationsGateway = {
        sendNotificationToUser: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                notifications_service_1.NotificationsService,
                {
                    provide: prisma_service_1.PrismaService,
                    useValue: mockPrismaService,
                },
                {
                    provide: notifications_gateway_1.NotificationsGateway,
                    useValue: mockNotificationsGateway,
                },
            ],
        }).compile();
        service = module.get(notifications_service_1.NotificationsService);
        prismaService = module.get(prisma_service_1.PrismaService);
        notificationsGateway = module.get(notifications_gateway_1.NotificationsGateway);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('findAll', () => {
        it('should return only notifications for the specified user', async () => {
            const userId = 'user-123';
            const mockNotifications = [
                {
                    id: 'recipient-1',
                    notificationID: 'notification-1',
                    utilisateurID: userId,
                    estLu: false,
                    notification: {
                        notificationID: 'notification-1',
                        titre: 'Test Notification',
                        message: 'Test message',
                        createdByID: 'other-user',
                        createdBy: {
                            utilisateurID: 'other-user',
                            nom: 'Other',
                            prenom: 'User',
                            email: 'other@example.com',
                        },
                    },
                },
            ];
            mockPrismaService.notificationRecipient.findMany.mockResolvedValue(mockNotifications);
            const result = await service.findAll(userId);
            expect(mockPrismaService.notificationRecipient.findMany).toHaveBeenCalledWith({
                where: { utilisateurID: userId },
                include: {
                    notification: {
                        include: {
                            createdBy: {
                                select: {
                                    utilisateurID: true,
                                    nom: true,
                                    prenom: true,
                                    email: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    notification: {
                        dateCreation: 'desc',
                    },
                },
            });
            expect(result).toEqual(mockNotifications);
        });
    });
    describe('findUnread', () => {
        it('should return only unread notifications for the specified user', async () => {
            const userId = 'user-123';
            const mockUnreadNotifications = [
                {
                    id: 'recipient-1',
                    notificationID: 'notification-1',
                    utilisateurID: userId,
                    estLu: false,
                    notification: {
                        notificationID: 'notification-1',
                        titre: 'Unread Notification',
                        message: 'Unread message',
                        createdByID: 'other-user',
                        createdBy: {
                            utilisateurID: 'other-user',
                            nom: 'Other',
                            prenom: 'User',
                            email: 'other@example.com',
                        },
                    },
                },
            ];
            mockPrismaService.notificationRecipient.findMany.mockResolvedValue(mockUnreadNotifications);
            const result = await service.findUnread(userId);
            expect(mockPrismaService.notificationRecipient.findMany).toHaveBeenCalledWith({
                where: {
                    utilisateurID: userId,
                    estLu: false,
                },
                include: {
                    notification: {
                        include: {
                            createdBy: {
                                select: {
                                    utilisateurID: true,
                                    nom: true,
                                    prenom: true,
                                    email: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    notification: {
                        dateCreation: 'desc',
                    },
                },
            });
            expect(result).toEqual(mockUnreadNotifications);
        });
    });
    describe('markAsRead', () => {
        it('should mark a notification as read for the correct user', async () => {
            const userId = 'user-123';
            const notificationId = 'notification-1';
            const mockRecipient = {
                id: 'recipient-1',
                notificationID: notificationId,
                utilisateurID: userId,
                estLu: false,
            };
            mockPrismaService.notificationRecipient.findFirst.mockResolvedValue(mockRecipient);
            mockPrismaService.notificationRecipient.update.mockResolvedValue({
                ...mockRecipient,
                estLu: true,
                dateLecture: new Date(),
            });
            const result = await service.markAsRead(notificationId, userId);
            expect(mockPrismaService.notificationRecipient.findFirst).toHaveBeenCalledWith({
                where: {
                    notificationID: notificationId,
                    utilisateurID: userId,
                },
            });
            expect(mockPrismaService.notificationRecipient.update).toHaveBeenCalledWith({
                where: {
                    notificationID_utilisateurID: {
                        notificationID: notificationId,
                        utilisateurID: userId,
                    },
                },
                data: {
                    estLu: true,
                    dateLecture: expect.any(Date),
                },
            });
            expect(mockNotificationsGateway.sendNotificationToUser).toHaveBeenCalledWith(userId, { type: 'notification_read', notificationId });
        });
        it('should throw NotFoundException if notification does not belong to user', async () => {
            const userId = 'user-123';
            const notificationId = 'notification-1';
            mockPrismaService.notificationRecipient.findFirst.mockResolvedValue(null);
            await expect(service.markAsRead(notificationId, userId)).rejects.toThrow(common_1.NotFoundException);
            expect(mockPrismaService.notificationRecipient.findFirst).toHaveBeenCalledWith({
                where: {
                    notificationID: notificationId,
                    utilisateurID: userId,
                },
            });
        });
    });
    describe('remove', () => {
        it('should delete a notification for the correct user', async () => {
            const userId = 'user-123';
            const notificationId = 'notification-1';
            const mockRecipient = {
                id: 'recipient-1',
                notificationID: notificationId,
                utilisateurID: userId,
                estLu: false,
            };
            mockPrismaService.notificationRecipient.findFirst.mockResolvedValue(mockRecipient);
            mockPrismaService.notificationRecipient.delete.mockResolvedValue(mockRecipient);
            const result = await service.remove(notificationId, userId);
            expect(mockPrismaService.notificationRecipient.findFirst).toHaveBeenCalledWith({
                where: {
                    notificationID: notificationId,
                    utilisateurID: userId,
                },
            });
            expect(mockPrismaService.notificationRecipient.delete).toHaveBeenCalledWith({
                where: {
                    notificationID_utilisateurID: {
                        notificationID: notificationId,
                        utilisateurID: userId,
                    },
                },
            });
            expect(result).toEqual(mockRecipient);
        });
        it('should throw NotFoundException if notification does not belong to user', async () => {
            const userId = 'user-123';
            const notificationId = 'notification-1';
            mockPrismaService.notificationRecipient.findFirst.mockResolvedValue(null);
            await expect(service.remove(notificationId, userId)).rejects.toThrow(common_1.NotFoundException);
            expect(mockPrismaService.notificationRecipient.findFirst).toHaveBeenCalledWith({
                where: {
                    notificationID: notificationId,
                    utilisateurID: userId,
                },
            });
        });
    });
    describe('markAllAsRead', () => {
        it('should mark all unread notifications as read for the specified user', async () => {
            const userId = 'user-123';
            const mockResult = { count: 5 };
            mockPrismaService.notificationRecipient.updateMany.mockResolvedValue(mockResult);
            const result = await service.markAllAsRead(userId);
            expect(mockPrismaService.notificationRecipient.updateMany).toHaveBeenCalledWith({
                where: {
                    utilisateurID: userId,
                    estLu: false,
                },
                data: {
                    estLu: true,
                    dateLecture: expect.any(Date),
                },
            });
            expect(mockNotificationsGateway.sendNotificationToUser).toHaveBeenCalledWith(userId, { type: 'all_notifications_read' });
            expect(result).toEqual(mockResult);
        });
    });
});
//# sourceMappingURL=notifications.service.spec.js.map