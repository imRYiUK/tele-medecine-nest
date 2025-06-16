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
const journal_activity_service_1 = require("../journal/journal-activity.service");
let PatientsService = class PatientsService {
    prisma;
    journalActivityService;
    constructor(prisma, journalActivityService) {
        this.prisma = prisma;
        this.journalActivityService = journalActivityService;
    }
    async create(createPatientDto, userId) {
        const { dossierMedical, ...patientData } = createPatientDto;
        const patient = await this.prisma.patient.create({
            data: {
                ...patientData,
                createdBy: userId,
                updatedAt: new Date(),
                createdAt: new Date(),
            },
        });
        if (dossierMedical) {
            await this.prisma.dossierMedical.create({
                data: {
                    patientID: patient.patientID,
                    createdBy: userId,
                    etatDossier: dossierMedical.etatDossier,
                    createdAt: new Date(),
                },
            });
        }
        await this.journalActivityService.logActivity({
            utilisateurID: userId.toString(),
            typeAction: 'CREATION_PATIENT',
            description: `Création d'un nouveau patient: ${patient.nom} ${patient.prenom}`,
        });
        return patient;
    }
    async findAll(params) {
        const { search, page = 1, limit = 10 } = params;
        const skip = (page - 1) * limit;
        const where = search
            ? {
                OR: [
                    { nom: { contains: search } },
                    { prenom: { contains: search } },
                    { email: { contains: search } },
                    { telephone: { contains: search } },
                ],
            }
            : {};
        const [patients, total] = await Promise.all([
            this.prisma.patient.findMany({
                where,
                skip,
                take: limit,
                orderBy: { updatedAt: 'desc' },
                include: {
                    creator: {
                        select: {
                            utilisateurID: true,
                            email: true,
                        },
                    },
                    _count: {
                        select: { consultations: true },
                    },
                },
            }),
            this.prisma.patient.count({ where }),
        ]);
        return {
            data: patients,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(patientID) {
        const patient = await this.prisma.patient.findUnique({
            where: { patientID },
            include: {
                creator: {
                    select: {
                        utilisateurID: true,
                        email: true,
                    },
                },
                consultations: {
                    orderBy: { createdAt: 'desc' },
                    include: {
                        medecin: {
                            select: {
                                utilisateurID: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });
        if (!patient) {
            throw new common_1.NotFoundException(`Patient avec l'ID ${patientID} non trouvé`);
        }
        return patient;
    }
    async update(patientID, updatePatientDto, userId) {
        await this.findOne(patientID);
        const data = { ...updatePatientDto };
        if (updatePatientDto.dateNaissance) {
            data.dateNaissance = new Date(updatePatientDto.dateNaissance);
        }
        const patient = await this.prisma.patient.update({
            where: { patientID },
            data,
        });
        await this.journalActivityService.logActivity({
            utilisateurID: userId.toString(),
            typeAction: 'MODIFICATION_PATIENT',
            description: `Modification des informations du patient: ${patient.nom} ${patient.prenom}`,
        });
        return patient;
    }
    async remove(patientID) {
        await this.findOne(patientID);
        return this.prisma.patient.delete({
            where: { patientID },
        });
    }
    async createMedicalRecord(createMedicalRecordDto, userId) {
        const { patientId, etatDossier } = createMedicalRecordDto;
        await this.findOne(patientId);
        const dossierMedical = await this.prisma.dossierMedical.create({
            data: {
                patientID: patientId,
                createdBy: userId,
                etatDossier,
                createdAt: new Date(),
            },
        });
        await this.journalActivityService.logActivity({
            utilisateurID: userId.toString(),
            typeAction: 'CREATION_DOSSIER',
            description: `Création d'un nouveau dossier médical pour le patient ID: ${patientId}`,
        });
        return dossierMedical;
    }
};
exports.PatientsService = PatientsService;
exports.PatientsService = PatientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        journal_activity_service_1.JournalActivityService])
], PatientsService);
//# sourceMappingURL=patients.service.js.map