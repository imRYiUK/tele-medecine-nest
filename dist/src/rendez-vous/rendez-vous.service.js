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
let RendezVousService = class RendezVousService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        let dateHeure = data.dateHeure;
        if (typeof dateHeure === 'string') {
            if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(dateHeure)) {
                dateHeure += ':00';
            }
            dateHeure = new Date(dateHeure);
        }
        const conflits = await this.prisma.rendezVous.findFirst({
            where: {
                medecinID: data.medecinID,
                dateHeure: dateHeure,
            },
        });
        if (conflits) {
            throw new common_1.BadRequestException('Le médecin a déjà un rendez-vous à cette date/heure.');
        }
        const created = await this.prisma.rendezVous.create({
            data: { ...data, dateHeure },
            include: {
                patient: { select: { patientID: true, nom: true, prenom: true } },
                medecin: { select: { utilisateurID: true, nom: true, prenom: true } },
            },
        });
        return new rendez_vous_dto_1.RendezVousDto(created);
    }
    async findAll() {
        const results = await this.prisma.rendezVous.findMany({
            include: {
                patient: { select: { patientID: true, nom: true, prenom: true } },
                medecin: { select: { utilisateurID: true, nom: true, prenom: true } },
            },
            orderBy: { dateHeure: 'asc' },
        });
        return results.map(rdv => new rendez_vous_dto_1.RendezVousDto(rdv));
    }
    async findByMedecin(medecinID) {
        const results = await this.prisma.rendezVous.findMany({
            where: { medecinID },
            include: {
                patient: { select: { patientID: true, nom: true, prenom: true } },
            },
            orderBy: { dateHeure: 'asc' },
        });
        return results.map(rdv => new rendez_vous_dto_1.RendezVousDto(rdv));
    }
    async findByPatient(patientID) {
        const results = await this.prisma.rendezVous.findMany({
            where: { patientID },
            include: {
                medecin: { select: { utilisateurID: true, nom: true, prenom: true } },
            },
            orderBy: { dateHeure: 'asc' },
        });
        return results.map(rdv => new rendez_vous_dto_1.RendezVousDto(rdv));
    }
    async update(id, data) {
        const rendezVous = await this.prisma.rendezVous.findUnique({ where: { rendezVousID: id } });
        if (!rendezVous)
            throw new common_1.NotFoundException('Rendez-vous non trouvé');
        const newMedecinID = data.medecinID ?? rendezVous.medecinID;
        let newDateHeure = data.dateHeure ?? rendezVous.dateHeure;
        if (typeof newDateHeure === 'string') {
            if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(newDateHeure)) {
                newDateHeure += ':00';
            }
            newDateHeure = new Date(newDateHeure);
        }
        const conflits = await this.prisma.rendezVous.findFirst({
            where: {
                medecinID: newMedecinID,
                dateHeure: newDateHeure,
                NOT: { rendezVousID: id },
            },
        });
        if (conflits) {
            throw new common_1.BadRequestException('Le médecin a déjà un rendez-vous à cette date/heure.');
        }
        const updated = await this.prisma.rendezVous.update({
            where: { rendezVousID: id },
            data: { ...data, dateHeure: newDateHeure },
            include: {
                patient: { select: { patientID: true, nom: true, prenom: true } },
                medecin: { select: { utilisateurID: true, nom: true, prenom: true } },
            },
        });
        return new rendez_vous_dto_1.RendezVousDto(updated);
    }
    async remove(id) {
        const deleted = await this.prisma.rendezVous.delete({
            where: { rendezVousID: id },
            include: {
                patient: { select: { patientID: true, nom: true, prenom: true } },
                medecin: { select: { utilisateurID: true, nom: true, prenom: true } },
            },
        });
        return new rendez_vous_dto_1.RendezVousDto(deleted);
    }
};
exports.RendezVousService = RendezVousService;
exports.RendezVousService = RendezVousService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RendezVousService);
//# sourceMappingURL=rendez-vous.service.js.map