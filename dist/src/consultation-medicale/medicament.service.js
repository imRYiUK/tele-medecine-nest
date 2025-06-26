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
exports.MedicamentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const medicament_dto_1 = require("./dto/medicament.dto");
let MedicamentService = class MedicamentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const medicaments = await this.prisma.medicament.findMany({
            orderBy: { nom: 'asc' },
        });
        return medicaments.map(med => new medicament_dto_1.MedicamentDto(med));
    }
    async findOne(medicamentID) {
        const medicament = await this.prisma.medicament.findUnique({
            where: { medicamentID },
        });
        if (!medicament) {
            throw new Error(`Medicament with ID ${medicamentID} not found`);
        }
        return new medicament_dto_1.MedicamentDto(medicament);
    }
    async searchByName(searchTerm) {
        const medicaments = await this.prisma.medicament.findMany({
            where: {
                nom: {
                    contains: searchTerm,
                },
            },
            orderBy: { nom: 'asc' },
            take: 50,
        });
        return medicaments.map(med => new medicament_dto_1.MedicamentDto(med));
    }
    async searchByNameStartsWith(searchTerm) {
        const medicaments = await this.prisma.medicament.findMany({
            where: {
                nom: {
                    startsWith: searchTerm,
                },
            },
            orderBy: { nom: 'asc' },
            take: 20,
        });
        return medicaments.map(med => new medicament_dto_1.MedicamentDto(med));
    }
    async getRandomMedicaments(limit = 10) {
        const medicaments = await this.prisma.medicament.findMany({
            take: limit,
            orderBy: {
                medicamentID: 'asc',
            },
        });
        return medicaments.map(med => new medicament_dto_1.MedicamentDto(med));
    }
};
exports.MedicamentService = MedicamentService;
exports.MedicamentService = MedicamentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MedicamentService);
//# sourceMappingURL=medicament.service.js.map