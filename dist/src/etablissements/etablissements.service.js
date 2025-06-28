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
exports.EtablissementsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
const users_service_1 = require("../users/users.service");
let EtablissementsService = class EtablissementsService {
    prisma;
    notificationsService;
    usersService;
    constructor(prisma, notificationsService, usersService) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
        this.usersService = usersService;
    }
    async create(createEtablissementDto) {
        const existingEtablissement = await this.prisma.etablissement.findFirst({
            where: {
                OR: [
                    { email: createEtablissementDto.email },
                    { telephone: createEtablissementDto.telephone }
                ]
            }
        });
        if (existingEtablissement) {
            throw new common_1.ConflictException('Un établissement avec cet email ou numéro de téléphone existe déjà');
        }
        const data = {
            ...createEtablissementDto,
            type: createEtablissementDto.type,
            estActif: createEtablissementDto.estActif ?? true,
        };
        const etablissement = await this.prisma.etablissement.create({
            data,
            include: {
                _count: {
                    select: {
                        utilisateurs: true
                    }
                }
            }
        });
        await this.notifySuperAdmins({
            titre: 'Nouvel établissement créé',
            message: `L'établissement "${etablissement.nom}" a été créé.`,
            type: 'ETABLISSEMENT_CREATED',
            lien: `/etablissements/${etablissement.etablissementID}`,
        });
        return this.mapToDto(etablissement);
    }
    async findAll() {
        const etablissements = await this.prisma.etablissement.findMany({
            orderBy: {
                nom: 'asc'
            },
            include: {
                _count: {
                    select: {
                        utilisateurs: true
                    }
                }
            }
        });
        return etablissements.map(etablissement => this.mapToDto(etablissement));
    }
    async findOne(id) {
        const etablissement = await this.prisma.etablissement.findUnique({
            where: { etablissementID: id },
            include: {
                _count: {
                    select: {
                        utilisateurs: true
                    }
                }
            }
        });
        if (!etablissement) {
            throw new common_1.NotFoundException(`Établissement avec l'ID ${id} non trouvé`);
        }
        return this.mapToDto(etablissement);
    }
    async update(id, updateEtablissementDto) {
        const existingEtablissement = await this.prisma.etablissement.findUnique({
            where: { etablissementID: id },
        });
        if (!existingEtablissement) {
            throw new common_1.NotFoundException(`Établissement avec l'ID ${id} non trouvé`);
        }
        if (updateEtablissementDto.email || updateEtablissementDto.telephone) {
            const duplicateCheck = await this.prisma.etablissement.findFirst({
                where: {
                    AND: [
                        { etablissementID: { not: id } },
                        {
                            OR: [
                                { email: updateEtablissementDto.email },
                                { telephone: updateEtablissementDto.telephone }
                            ]
                        }
                    ]
                }
            });
            if (duplicateCheck) {
                throw new common_1.ConflictException('Un établissement avec cet email ou numéro de téléphone existe déjà');
            }
        }
        const data = {
            ...updateEtablissementDto,
            type: updateEtablissementDto.type,
        };
        const updatedEtablissement = await this.prisma.etablissement.update({
            where: { etablissementID: id },
            data,
            include: {
                _count: {
                    select: {
                        utilisateurs: true
                    }
                }
            }
        });
        await this.notifySuperAdmins({
            titre: 'Établissement modifié',
            message: `L'établissement "${updatedEtablissement.nom}" a été modifié.`,
            type: 'ETABLISSEMENT_UPDATED',
            lien: `/etablissements/${updatedEtablissement.etablissementID}`,
        });
        return this.mapToDto(updatedEtablissement);
    }
    async remove(id) {
        const etablissement = await this.prisma.etablissement.findUnique({
            where: { etablissementID: id },
        });
        if (!etablissement) {
            throw new common_1.NotFoundException(`Établissement avec l'ID ${id} non trouvé`);
        }
        const usersCount = await this.prisma.utilisateur.count({
            where: { etablissementID: id }
        });
        if (usersCount > 0) {
            throw new common_1.ConflictException('Impossible de supprimer cet établissement car il a des utilisateurs associés');
        }
        await this.prisma.etablissement.delete({
            where: { etablissementID: id },
        });
        await this.notifySuperAdmins({
            titre: 'Établissement supprimé',
            message: `L'établissement "${etablissement.nom}" a été supprimé.`,
            type: 'ETABLISSEMENT_DELETED',
            lien: '/etablissements',
        });
    }
    async findByRegion(region) {
        const etablissements = await this.prisma.etablissement.findMany({
            where: { region },
            orderBy: {
                nom: 'asc'
            },
            include: {
                _count: {
                    select: {
                        utilisateurs: true
                    }
                }
            }
        });
        return etablissements.map(etablissement => this.mapToDto(etablissement));
    }
    async findByType(type) {
        const etablissements = await this.prisma.etablissement.findMany({
            where: { type },
            orderBy: {
                nom: 'asc'
            },
            include: {
                _count: {
                    select: {
                        utilisateurs: true
                    }
                }
            }
        });
        return etablissements.map(etablissement => this.mapToDto(etablissement));
    }
    mapToDto(etablissement) {
        const { _count, ...rest } = etablissement;
        const { orthancPassword, ...etablissementData } = rest;
        return {
            ...etablissementData,
            type: etablissementData.type,
            estActif: etablissementData.estActif,
            createdAt: etablissementData.createdAt,
            updatedAt: etablissementData.updatedAt,
            description: etablissementData.description ?? undefined,
            siteWeb: etablissementData.siteWeb ?? undefined,
            orthancUrl: etablissementData.orthancUrl ?? undefined,
            orthancLogin: etablissementData.orthancLogin ?? undefined,
        };
    }
    async notifySuperAdmins(notification) {
        const superAdmins = await this.prisma.utilisateur.findMany({
            where: {
                role: "SUPER_ADMIN",
                estActif: true,
            },
            select: { utilisateurID: true }
        });
        for (const admin of superAdmins) {
            await this.notificationsService.create({
                destinataires: [admin.utilisateurID],
                ...notification,
            }, admin.utilisateurID);
        }
    }
};
exports.EtablissementsService = EtablissementsService;
exports.EtablissementsService = EtablissementsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService,
        users_service_1.UsersService])
], EtablissementsService);
//# sourceMappingURL=etablissements.service.js.map