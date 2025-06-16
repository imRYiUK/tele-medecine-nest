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
let ConsultationMedicaleService = class ConsultationMedicaleService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createConsultationMedicaleDto, medecinID) {
        return this.prisma.consultationMedicale.create({
            data: {
                ...createConsultationMedicaleDto,
                medecinID,
            },
            include: {
                patient: {
                    select: {
                        nom: true,
                        prenom: true,
                        dateNaissance: true,
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
    }
    async findAll() {
        return this.prisma.consultationMedicale.findMany({
            include: {
                patient: {
                    select: {
                        nom: true,
                        prenom: true,
                        dateNaissance: true,
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
                patient: {
                    select: {
                        nom: true,
                        prenom: true,
                        dateNaissance: true,
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
        return this.prisma.consultationMedicale.update({
            where: { consultationID },
            data: updateConsultationMedicaleDto,
            include: {
                patient: {
                    select: {
                        nom: true,
                        prenom: true,
                        dateNaissance: true,
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
    }
    async remove(consultationID) {
        await this.findOne(consultationID);
        return this.prisma.consultationMedicale.delete({
            where: { consultationID },
        });
    }
    async findByPatient(patientID) {
        return this.prisma.consultationMedicale.findMany({
            where: { patientID },
            include: {
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
                patient: {
                    select: {
                        nom: true,
                        prenom: true,
                        dateNaissance: true,
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
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ConsultationMedicaleService);
//# sourceMappingURL=consultation-medicale.service.js.map