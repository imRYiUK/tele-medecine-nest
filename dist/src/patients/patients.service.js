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
exports.PatientsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PatientsService = class PatientsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPatientDto, userId) {
        const { dossierMedical, dateNaissance, ...patientData } = createPatientDto;
        return this.prisma.patient.create({
            data: {
                ...patientData,
                dateNaissance: new Date(dateNaissance),
                createdBy: userId,
                createdAt: new Date(),
                updatedAt: new Date(),
                dossierMedical: dossierMedical ? {
                    create: {
                        ...dossierMedical,
                        createdBy: userId,
                        createdAt: new Date(),
                    }
                } : undefined
            },
            include: {
                dossierMedical: true,
            },
        });
    }
    async findAll() {
        return this.prisma.patient.findMany({
            include: {
                dossierMedical: true,
                consultations: true,
                examens: true,
            },
        });
    }
    async findOne(patientID) {
        const patient = await this.prisma.patient.findUnique({
            where: { patientID },
            include: {
                dossierMedical: true,
                consultations: true,
                examens: true,
            },
        });
        if (!patient) {
            throw new common_1.NotFoundException(`Patient avec l'ID ${patientID} non trouvé`);
        }
        return patient;
    }
    async update(patientID, updatePatientDto) {
        const { dossierMedical, ...patientData } = updatePatientDto;
        return this.prisma.patient.update({
            where: { patientID },
            data: {
                ...patientData,
                updatedAt: new Date(),
            },
            include: {
                dossierMedical: true,
            },
        });
    }
    async remove(patientID) {
        await this.prisma.patient.delete({
            where: { patientID },
        });
    }
    async createMedicalRecord(patientID, createMedicalRecordDto, userId) {
        const patient = await this.findOne(patientID);
        if (patient.dossierMedical) {
            throw new common_1.ConflictException('Un dossier médical existe déjà pour ce patient');
        }
        const dossierMedical = await this.prisma.dossierMedical.create({
            data: {
                patientID,
                etatDossier: createMedicalRecordDto.etatDossier,
                createdBy: userId,
                createdAt: new Date(),
            },
        });
        return dossierMedical;
    }
    async getMedicalRecord(patientID) {
        const patient = await this.findOne(patientID);
        return patient.dossierMedical;
    }
    async updateMedicalRecord(patientID, updateMedicalRecordDto) {
        const patient = await this.findOne(patientID);
        if (!patient.dossierMedical) {
            throw new common_1.NotFoundException('Aucun dossier médical trouvé pour ce patient');
        }
        const dossierMedical = await this.prisma.dossierMedical.update({
            where: { patientID },
            data: {
                etatDossier: updateMedicalRecordDto.etatDossier,
            },
        });
        return dossierMedical;
    }
};
exports.PatientsService = PatientsService;
exports.PatientsService = PatientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PatientsService);
//# sourceMappingURL=patients.service.js.map