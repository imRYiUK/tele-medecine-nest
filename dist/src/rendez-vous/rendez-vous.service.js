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
exports.RendezVousService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const rendez_vous_dto_1 = require("./dto/rendez-vous.dto");
const notifications_service_1 = require("../notifications/notifications.service");
const users_service_1 = require("../users/users.service");
let RendezVousService = class RendezVousService {
    prisma;
    notificationsService;
    usersService;
    constructor(prisma, notificationsService, usersService) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
        this.usersService = usersService;
    }
    async create(data) {
        const conflits = await this.prisma.rendezVous.findFirst({
            where: {
                medecinID: data.medecinID,
                date: data.date,
                AND: [
                    { debutTime: { lt: data.endTime } },
                    { endTime: { gt: data.debutTime } },
                ],
            },
        });
        if (conflits) {
            throw new common_1.BadRequestException('Le médecin a déjà un rendez-vous à ce créneau.');
        }
        const created = await this.prisma.rendezVous.create({
            data,
            include: {
                patient: { select: { patientID: true, nom: true, prenom: true } },
                medecin: { select: { utilisateurID: true, nom: true, prenom: true } },
            },
        });
        let lien = '/rendez-vous';
        try {
            const recipient = await this.usersService.findOne(data.medecinID);
            if (recipient.role === 'RADIOLOGUE') {
                lien = '/radiologue/rendez-vous';
            }
            else if (recipient.role === 'MEDECIN') {
                lien = '/medecin/rendez-vous';
            }
        }
        catch (e) {
        }
        try {
            await this.notificationsService.create({
                destinataires: [data.medecinID],
                titre: 'Nouveau Rendez-vous',
                message: `Un nouveau rendez-vous a été créé pour ${created.patient.nom} ${created.patient.prenom} le ${data.date} de ${data.debutTime} à ${data.endTime}. Motif: ${data.motif || 'Non spécifié'}`,
                type: 'RENDEZ_VOUS_CREATED',
                lien,
            }, data.createdByID);
        }
        catch (error) {
            console.error('Failed to create notification:', error);
        }
        return new rendez_vous_dto_1.RendezVousDto(created);
    }
    async findAll() {
        const results = await this.prisma.rendezVous.findMany({
            include: {
                patient: { select: { patientID: true, nom: true, prenom: true } },
                medecin: { select: { utilisateurID: true, nom: true, prenom: true } },
            },
            orderBy: [
                { date: 'asc' },
                { debutTime: 'asc' },
            ],
        });
        return results.map(rdv => new rendez_vous_dto_1.RendezVousDto(rdv));
    }
    async findByMedecin(medecinID) {
        const results = await this.prisma.rendezVous.findMany({
            where: { medecinID },
            include: {
                patient: { select: { patientID: true, nom: true, prenom: true } },
            },
            orderBy: [
                { date: 'asc' },
                { debutTime: 'asc' },
            ],
        });
        return results.map(rdv => new rendez_vous_dto_1.RendezVousDto(rdv));
    }
    async findByPatient(patientID) {
        const results = await this.prisma.rendezVous.findMany({
            where: { patientID },
            include: {
                medecin: { select: { utilisateurID: true, nom: true, prenom: true } },
            },
            orderBy: [
                { date: 'asc' },
                { debutTime: 'asc' },
            ],
        });
        return results.map(rdv => new rendez_vous_dto_1.RendezVousDto(rdv));
    }
    async update(id, data) {
        const rendezVous = await this.prisma.rendezVous.findUnique({ where: { rendezVousID: id } });
        if (!rendezVous)
            throw new common_1.NotFoundException('Rendez-vous non trouvé');
        const newMedecinID = data.medecinID ?? rendezVous.medecinID;
        const newDate = data.date ?? rendezVous.date;
        const newDebutTime = data.debutTime ?? rendezVous.debutTime;
        const newEndTime = data.endTime ?? rendezVous.endTime;
        const conflits = await this.prisma.rendezVous.findFirst({
            where: {
                medecinID: newMedecinID,
                date: newDate,
                AND: [
                    { debutTime: { lt: newEndTime } },
                    { endTime: { gt: newDebutTime } },
                ],
                NOT: { rendezVousID: id },
            },
        });
        if (conflits) {
            throw new common_1.BadRequestException('Le médecin a déjà un rendez-vous à ce créneau.');
        }
        const updated = await this.prisma.rendezVous.update({
            where: { rendezVousID: id },
            data: {
                ...data,
                date: newDate,
                debutTime: newDebutTime,
                endTime: newEndTime,
                medecinID: newMedecinID,
            },
            include: {
                patient: { select: { patientID: true, nom: true, prenom: true } },
                medecin: { select: { utilisateurID: true, nom: true, prenom: true } },
            },
        });
        try {
            await this.notificationsService.create({
                destinataires: [newMedecinID],
                titre: 'Rendez-vous Modifié',
                message: `Le rendez-vous pour ${updated.patient.nom} ${updated.patient.prenom} a été modifié. Nouvelle date: ${newDate} de ${newDebutTime} à ${newEndTime}. Motif: ${data.motif || updated.motif || 'Non spécifié'}`,
                type: 'RENDEZ_VOUS_UPDATED',
                lien: `/rendez-vous`,
            }, 'system');
        }
        catch (error) {
            console.error('Failed to create update notification:', error);
        }
        return new rendez_vous_dto_1.RendezVousDto(updated);
    }
    async remove(id) {
        const rendezVous = await this.prisma.rendezVous.findUnique({
            where: { rendezVousID: id },
            include: {
                patient: { select: { patientID: true, nom: true, prenom: true } },
                medecin: { select: { utilisateurID: true, nom: true, prenom: true } },
            },
        });
        if (!rendezVous) {
            throw new common_1.NotFoundException('Rendez-vous non trouvé');
        }
        const deleted = await this.prisma.rendezVous.delete({
            where: { rendezVousID: id },
            include: {
                patient: { select: { patientID: true, nom: true, prenom: true } },
                medecin: { select: { utilisateurID: true, nom: true, prenom: true } },
            },
        });
        try {
            await this.notificationsService.create({
                destinataires: [deleted.medecin.utilisateurID],
                titre: 'Rendez-vous Annulé',
                message: `Le rendez-vous pour ${deleted.patient.nom} ${deleted.patient.prenom} prévu le ${deleted.date} de ${deleted.debutTime} à ${deleted.endTime} a été annulé.`,
                type: 'RENDEZ_VOUS_CANCELLED',
                lien: `/rendez-vous`,
            }, 'system');
        }
        catch (error) {
            console.error('Failed to create deletion notification:', error);
        }
        return new rendez_vous_dto_1.RendezVousDto(deleted);
    }
};
exports.RendezVousService = RendezVousService;
exports.RendezVousService = RendezVousService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService,
        users_service_1.UsersService])
], RendezVousService);
//# sourceMappingURL=rendez-vous.service.js.map