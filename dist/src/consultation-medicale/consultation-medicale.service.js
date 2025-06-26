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
exports.ConsultationMedicaleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
let ConsultationMedicaleService = class ConsultationMedicaleService {
    prisma;
    notificationsService;
    constructor(prisma, notificationsService) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
    }
    async create(createConsultationMedicaleDto) {
        const { ordonnance, dossierID, medecinID, ...consultationData } = createConsultationMedicaleDto;
        if (!dossierID) {
            throw new Error('dossierID is required');
        }
        if (!medecinID) {
            throw new Error('medecinID is required');
        }
        const now = new Date();
        const consultation = await this.prisma.consultationMedicale.create({
            data: {
                ...consultationData,
                dossierID: dossierID,
                medecinID: medecinID,
                createdAt: now,
                updatedAt: now,
                ...(ordonnance && {
                    ordonnances: {
                        create: [{
                                dateEmission: now,
                                dateExpiration: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
                                estRenouvelable: false,
                                prescriptions: {
                                    create: ordonnance.prescriptions.map(prescription => ({
                                        medicamentID: prescription.medicamentID,
                                        posologie: prescription.posologie,
                                        duree: prescription.duree,
                                        instructions: prescription.instructions,
                                    })),
                                },
                            }],
                    },
                }),
            },
            include: {
                dossier: {
                    include: {
                        patient: {
                            select: {
                                nom: true,
                                prenom: true,
                                dateNaissance: true,
                            },
                        },
                    },
                },
                medecin: {
                    select: {
                        nom: true,
                        prenom: true,
                        role: true,
                    },
                },
                ordonnances: {
                    include: {
                        prescriptions: {
                            include: {
                                medicament: true,
                            },
                        },
                    },
                },
            },
        });
        await this.notificationsService.create({
            utilisateurID: medecinID,
            titre: 'Nouvelle Consultation Créée',
            message: `Une nouvelle consultation a été créée pour ${consultation.dossier.patient.nom} ${consultation.dossier.patient.prenom}`,
            type: 'CONSULTATION_CREATED',
            lien: `/consultations/${consultation.consultationID}`,
        });
        return consultation;
    }
    async findAll() {
        return this.prisma.consultationMedicale.findMany({
            include: {
                dossier: {
                    include: {
                        patient: {
                            select: {
                                nom: true,
                                prenom: true,
                                dateNaissance: true,
                            },
                        },
                    },
                },
                medecin: {
                    select: {
                        nom: true,
                        prenom: true,
                        role: true,
                    },
                },
                ordonnances: {
                    include: {
                        prescriptions: {
                            include: {
                                medicament: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                dateConsultation: 'desc',
            },
        });
    }
    async findOne(consultationID) {
        const consultation = await this.prisma.consultationMedicale.findUnique({
            where: { consultationID },
            include: {
                dossier: {
                    include: {
                        patient: {
                            select: {
                                nom: true,
                                prenom: true,
                                dateNaissance: true,
                            },
                        },
                    },
                },
                medecin: {
                    select: {
                        nom: true,
                        prenom: true,
                        role: true,
                    },
                },
                ordonnances: {
                    include: {
                        prescriptions: {
                            include: {
                                medicament: true,
                            },
                        },
                    },
                },
            },
        });
        if (!consultation) {
            throw new common_1.NotFoundException(`Consultation médicale avec l'ID ${consultationID} non trouvée`);
        }
        return consultation;
    }
    async update(consultationID, updateConsultationMedicaleDto) {
        const consultation = await this.findOne(consultationID);
        const updatedConsultation = await this.prisma.consultationMedicale.update({
            where: { consultationID },
            data: updateConsultationMedicaleDto,
            include: {
                dossier: {
                    include: {
                        patient: {
                            select: {
                                nom: true,
                                prenom: true,
                                dateNaissance: true,
                            },
                        },
                    },
                },
                medecin: {
                    select: {
                        nom: true,
                        prenom: true,
                        role: true,
                    },
                },
                ordonnances: {
                    include: {
                        prescriptions: {
                            include: {
                                medicament: true,
                            },
                        },
                    },
                },
            },
        });
        await this.notificationsService.create({
            utilisateurID: consultation.medecinID,
            titre: 'Consultation Mise à Jour',
            message: `La consultation pour ${consultation.dossier.patient.nom} ${consultation.dossier.patient.prenom} a été mise à jour`,
            type: 'CONSULTATION_UPDATED',
            lien: `/consultations/${consultationID}`,
        });
        return updatedConsultation;
    }
    async remove(consultationID) {
        const consultation = await this.findOne(consultationID);
        await this.notificationsService.create({
            utilisateurID: consultation.medecinID,
            titre: 'Consultation Supprimée',
            message: `La consultation pour ${consultation.dossier.patient.nom} ${consultation.dossier.patient.prenom} a été supprimée`,
            type: 'CONSULTATION_DELETED',
            lien: '/consultations',
        });
        return this.prisma.consultationMedicale.delete({
            where: { consultationID },
        });
    }
    async findByPatient(patientID) {
        return this.prisma.consultationMedicale.findMany({
            where: {
                dossier: {
                    patientID: patientID,
                },
            },
            include: {
                dossier: {
                    include: {
                        patient: {
                            select: {
                                nom: true,
                                prenom: true,
                                dateNaissance: true,
                            },
                        },
                    },
                },
                medecin: {
                    select: {
                        nom: true,
                        prenom: true,
                        role: true,
                    },
                },
                ordonnances: {
                    include: {
                        prescriptions: {
                            include: {
                                medicament: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                dateConsultation: 'desc',
            },
        });
    }
    async findByDossier(dossierID) {
        return this.prisma.consultationMedicale.findMany({
            where: { dossierID },
            include: {
                dossier: {
                    include: {
                        patient: {
                            select: {
                                nom: true,
                                prenom: true,
                                dateNaissance: true,
                            },
                        },
                    },
                },
                medecin: {
                    select: {
                        nom: true,
                        prenom: true,
                        role: true,
                    },
                },
                ordonnances: {
                    include: {
                        prescriptions: {
                            include: {
                                medicament: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                dateConsultation: 'desc',
            },
        });
    }
    async findByMedecin(medecinID) {
        return this.prisma.consultationMedicale.findMany({
            where: { medecinID },
            include: {
                dossier: {
                    include: {
                        patient: {
                            select: {
                                nom: true,
                                prenom: true,
                                dateNaissance: true,
                            },
                        },
                    },
                },
                ordonnances: {
                    include: {
                        prescriptions: {
                            include: {
                                medicament: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                dateConsultation: 'desc',
            },
        });
    }
};
exports.ConsultationMedicaleService = ConsultationMedicaleService;
exports.ConsultationMedicaleService = ConsultationMedicaleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], ConsultationMedicaleService);
//# sourceMappingURL=consultation-medicale.service.js.map