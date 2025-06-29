"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const roles_1 = require("../common/constants/roles");
const client_1 = require("@prisma/client");
let JournalService = class JournalService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserEstablishment(utilisateurID) {
        const user = await this.prisma.utilisateur.findUnique({
            where: { utilisateurID },
            select: { etablissementID: true }
        });
        return user?.etablissementID;
    }
    async findAll(requesterId, requesterRole) {
        const baseQuery = {
            include: {
                utilisateur: {
                    select: {
                        nom: true,
                        prenom: true,
                        email: true,
                        role: true,
                        etablissementID: true
                    }
                }
            },
            orderBy: {
                dateAction: client_1.Prisma.SortOrder.desc
            }
        };
        if (requesterRole === roles_1.UserRole.SUPER_ADMIN) {
            return this.prisma.journalActivite.findMany(baseQuery);
        }
        const requesterEstablishment = await this.getUserEstablishment(requesterId);
        if (!requesterEstablishment) {
            throw new common_1.UnauthorizedException('User has no associated establishment');
        }
        return this.prisma.journalActivite.findMany({
            ...baseQuery,
            where: {
                utilisateur: {
                    etablissementID: requesterEstablishment
                }
            }
        });
    }
    async findByUser(utilisateurID, requesterId, requesterRole) {
        const baseQuery = {
            where: { utilisateurID },
            include: {
                utilisateur: {
                    select: {
                        nom: true,
                        prenom: true,
                        email: true,
                        role: true,
                        etablissementID: true
                    }
                }
            },
            orderBy: {
                dateAction: client_1.Prisma.SortOrder.desc
            }
        };
        if (requesterRole === roles_1.UserRole.SUPER_ADMIN) {
            return this.prisma.journalActivite.findMany(baseQuery);
        }
        const requesterEstablishment = await this.getUserEstablishment(requesterId);
        if (!requesterEstablishment) {
            throw new common_1.UnauthorizedException('User has no associated establishment');
        }
        const targetUser = await this.prisma.utilisateur.findUnique({
            where: { utilisateurID },
            select: { etablissementID: true }
        });
        if (targetUser?.etablissementID !== requesterEstablishment) {
            throw new common_1.UnauthorizedException('Cannot access logs from users outside your establishment');
        }
        return this.prisma.journalActivite.findMany(baseQuery);
    }
    async findByDateRange(startDate, endDate, requesterId, requesterRole) {
        const baseQuery = {
            where: {
                dateAction: {
                    gte: startDate,
                    lte: endDate
                }
            },
            include: {
                utilisateur: {
                    select: {
                        nom: true,
                        prenom: true,
                        email: true,
                        role: true,
                        etablissementID: true
                    }
                }
            },
            orderBy: {
                dateAction: client_1.Prisma.SortOrder.desc
            }
        };
        if (requesterRole === roles_1.UserRole.SUPER_ADMIN) {
            return this.prisma.journalActivite.findMany(baseQuery);
        }
        const requesterEstablishment = await this.getUserEstablishment(requesterId);
        if (!requesterEstablishment) {
            throw new common_1.UnauthorizedException('User has no associated establishment');
        }
        return this.prisma.journalActivite.findMany({
            ...baseQuery,
            where: {
                ...baseQuery.where,
                utilisateur: {
                    etablissementID: requesterEstablishment
                }
            }
        });
    }
    async findByTypeAction(typeAction, requesterId, requesterRole) {
        const baseQuery = {
            where: { typeAction },
            include: {
                utilisateur: {
                    select: {
                        nom: true,
                        prenom: true,
                        email: true,
                        role: true,
                        etablissementID: true
                    }
                }
            },
            orderBy: {
                dateAction: client_1.Prisma.SortOrder.desc
            }
        };
        if (requesterRole === roles_1.UserRole.SUPER_ADMIN) {
            return this.prisma.journalActivite.findMany(baseQuery);
        }
        const requesterEstablishment = await this.getUserEstablishment(requesterId);
        if (!requesterEstablishment) {
            throw new common_1.UnauthorizedException('User has no associated establishment');
        }
        return this.prisma.journalActivite.findMany({
            ...baseQuery,
            where: {
                ...baseQuery.where,
                utilisateur: {
                    etablissementID: requesterEstablishment
                }
            }
        });
    }
};
exports.JournalService = JournalService;
exports.JournalService = JournalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JournalService);
//# sourceMappingURL=journal.service.js.map