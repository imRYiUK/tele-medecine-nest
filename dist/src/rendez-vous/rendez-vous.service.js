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
let RendezVousService = class RendezVousService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const conflits = await this.prisma.rendezVous.findFirst({
            where: {
                medecinID: data.medecinID,
                dateHeure: data.dateHeure,
            },
        });
        if (conflits) {
            throw new common_1.BadRequestException('Le médecin a déjà un rendez-vous à cette date/heure.');
        }
        return this.prisma.rendezVous.create({ data });
    }
    async findAll() {
        return this.prisma.rendezVous.findMany({
            include: {
                patient: { select: { nom: true, prenom: true } },
                medecin: { select: { nom: true, prenom: true, email: true } },
                createdBy: { select: { nom: true, prenom: true } },
            },
            orderBy: { dateHeure: 'asc' },
        });
    }
    async findByMedecin(medecinID) {
        return this.prisma.rendezVous.findMany({
            where: { medecinID },
            include: {
                patient: { select: { nom: true, prenom: true } },
            },
            orderBy: { dateHeure: 'asc' },
        });
    }
    async findByPatient(patientID) {
        return this.prisma.rendezVous.findMany({
            where: { patientID },
            include: {
                medecin: { select: { nom: true, prenom: true, email: true } },
            },
            orderBy: { dateHeure: 'asc' },
        });
    }
    async update(id, data) {
        const rendezVous = await this.prisma.rendezVous.findUnique({ where: { rendezVousID: id } });
        if (!rendezVous)
            throw new common_1.NotFoundException('Rendez-vous non trouvé');
        const newMedecinID = data.medecinID ?? rendezVous.medecinID;
        const newDateHeure = data.dateHeure ?? rendezVous.dateHeure;
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
        return this.prisma.rendezVous.update({ where: { rendezVousID: id }, data });
    }
    async remove(id) {
        return this.prisma.rendezVous.delete({ where: { rendezVousID: id } });
    }
};
exports.RendezVousService = RendezVousService;
exports.RendezVousService = RendezVousService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RendezVousService);
//# sourceMappingURL=rendez-vous.service.js.map