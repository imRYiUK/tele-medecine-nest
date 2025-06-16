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
exports.ExamenMedicalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ExamenMedicalService = class ExamenMedicalService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createExamenMedicalDto, demandeParID) {
        return this.prisma.examenMedical.create({
            data: {
                ...createExamenMedicalDto,
                demandeParID,
            },
            include: {
                patient: {
                    select: {
                        nom: true,
                        prenom: true,
                        dateNaissance: true,
                    },
                },
                typeExamen: true,
                demandePar: {
                    select: {
                        nom: true,
                        prenom: true,
                        role: true,
                    },
                },
            },
        });
    }
    async findAll() {
        return this.prisma.examenMedical.findMany({
            include: {
                patient: {
                    select: {
                        nom: true,
                        prenom: true,
                        dateNaissance: true,
                    },
                },
                typeExamen: true,
                demandePar: {
                    select: {
                        nom: true,
                        prenom: true,
                        role: true,
                    },
                },
            },
            orderBy: {
                dateExamen: 'desc',
            },
        });
    }
    async findOne(examenID) {
        const examen = await this.prisma.examenMedical.findUnique({
            where: { examenID },
            include: {
                patient: {
                    select: {
                        nom: true,
                        prenom: true,
                        dateNaissance: true,
                    },
                },
                typeExamen: true,
                demandePar: {
                    select: {
                        nom: true,
                        prenom: true,
                        role: true,
                    },
                },
                images: true,
            },
        });
        if (!examen) {
            throw new common_1.NotFoundException(`Examen médical avec l'ID ${examenID} non trouvé`);
        }
        return examen;
    }
    async update(examenID, updateExamenMedicalDto) {
        const examen = await this.findOne(examenID);
        return this.prisma.examenMedical.update({
            where: { examenID },
            data: updateExamenMedicalDto,
            include: {
                patient: {
                    select: {
                        nom: true,
                        prenom: true,
                        dateNaissance: true,
                    },
                },
                typeExamen: true,
                demandePar: {
                    select: {
                        nom: true,
                        prenom: true,
                        role: true,
                    },
                },
            },
        });
    }
    async remove(examenID) {
        await this.findOne(examenID);
        return this.prisma.examenMedical.delete({
            where: { examenID },
        });
    }
    async findByPatient(patientID) {
        return this.prisma.examenMedical.findMany({
            where: { patientID },
            include: {
                typeExamen: true,
                demandePar: {
                    select: {
                        nom: true,
                        prenom: true,
                        role: true,
                    },
                },
                images: true,
            },
            orderBy: {
                dateExamen: 'desc',
            },
        });
    }
    async findByDossier(dossierID) {
        return this.prisma.examenMedical.findMany({
            where: { dossierID },
            include: {
                typeExamen: true,
                demandePar: {
                    select: {
                        nom: true,
                        prenom: true,
                        role: true,
                    },
                },
                images: true,
            },
            orderBy: {
                dateExamen: 'desc',
            },
        });
    }
};
exports.ExamenMedicalService = ExamenMedicalService;
exports.ExamenMedicalService = ExamenMedicalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExamenMedicalService);
//# sourceMappingURL=examen-medical.service.js.map