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
const notifications_service_1 = require("../notifications/notifications.service");
let ExamenMedicalService = class ExamenMedicalService {
    prisma;
    notificationsService;
    constructor(prisma, notificationsService) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
    }
    async create(createExamenMedicalDto, demandeParID) {
        if (!createExamenMedicalDto.dossierID) {
            throw new Error('dossierID est requis pour créer un examen médical');
        }
        const examen = await this.prisma.examenMedical.create({
            data: {
                ...createExamenMedicalDto,
                dateExamen: new Date(createExamenMedicalDto.dateExamen),
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
        await this.notificationsService.create({
            utilisateurID: demandeParID,
            titre: 'Nouvel examen médical créé',
            message: `Un nouvel examen médical a été créé pour le patient ${examen.patient.prenom} ${examen.patient.nom}`,
            type: 'EXAMEN_CREATED',
            lien: `/examens/${examen.examenID}`,
        });
        return examen;
    }
    async findAll(status, category, search) {
        const where = {};
        if (status && status !== 'TOUS') {
            if (status === 'EN_ATTENTE') {
                where.estAnalyse = false;
            }
            else if (status === 'EN_COURS') {
                where.estAnalyse = false;
                where.radiologues = {
                    some: {}
                };
            }
            else if (status === 'TERMINE') {
                where.estAnalyse = true;
            }
            else if (status === 'URGENT') {
                where.description = {
                    contains: 'urgent'
                };
            }
        }
        if (category && category !== 'TOUS') {
            where.typeExamen = {
                categorie: category
            };
        }
        if (search) {
            where.OR = [
                {
                    patient: {
                        OR: [
                            { nom: { contains: search } },
                            { prenom: { contains: search } }
                        ]
                    }
                },
                {
                    typeExamen: {
                        nomType: { contains: search }
                    }
                },
                {
                    demandePar: {
                        OR: [
                            { nom: { contains: search } },
                            { prenom: { contains: search } }
                        ]
                    }
                },
                {
                    description: { contains: search }
                }
            ];
        }
        return this.prisma.examenMedical.findMany({
            where,
            include: {
                patient: true,
                typeExamen: true,
                demandePar: true,
                images: true,
                radiologues: true,
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
                radiologues: {
                    select: { utilisateurID: true, nom: true, prenom: true, email: true }
                }
            },
        });
        if (!examen) {
            throw new common_1.NotFoundException(`Examen médical avec l'ID ${examenID} non trouvé`);
        }
        return examen;
    }
    async update(examenID, updateExamenMedicalDto, radiologistID) {
        const examen = await this.findOne(examenID);
        if (radiologistID) {
            await this.checkRadiologistPermissions(examenID, radiologistID);
        }
        const updateData = { ...updateExamenMedicalDto };
        if (updateData.dateExamen) {
            updateData.dateExamen = new Date(updateData.dateExamen);
        }
        const updatedExamen = await this.prisma.examenMedical.update({
            where: { examenID },
            data: updateData,
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
        await this.notificationsService.create({
            utilisateurID: examen.demandeParID,
            titre: 'Examen médical mis à jour',
            message: `L'examen médical du patient ${updatedExamen.patient.prenom} ${updatedExamen.patient.nom} a été mis à jour`,
            type: 'EXAMEN_UPDATED',
            lien: `/examens/${examenID}`,
        });
        return updatedExamen;
    }
    async remove(examenID) {
        const examen = await this.findOne(examenID);
        await this.notificationsService.create({
            utilisateurID: examen.demandeParID,
            titre: 'Examen médical supprimé',
            message: `L'examen médical du patient ${examen.patient.prenom} ${examen.patient.nom} a été supprimé`,
            type: 'EXAMEN_DELETED',
            lien: '/examens',
        });
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
                radiologues: {
                    select: { utilisateurID: true, nom: true, prenom: true, email: true }
                }
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
                radiologues: {
                    select: { utilisateurID: true, nom: true, prenom: true, email: true }
                }
            },
            orderBy: {
                dateExamen: 'desc',
            },
        });
    }
    async inviteRadiologue(examenID, radiologueID) {
        await this.findOne(examenID);
        return this.prisma.examenMedical.update({
            where: { examenID },
            data: {
                radiologues: {
                    connect: { utilisateurID: radiologueID }
                }
            },
            include: {
                radiologues: {
                    select: { utilisateurID: true, nom: true, prenom: true, email: true }
                }
            }
        });
    }
    async getRadiologistStats(radiologueID) {
        const [examensEnAttente, examensEnCours, examensTermines, examensUrgents] = await Promise.all([
            this.prisma.examenMedical.count({
                where: {
                    estAnalyse: false,
                    radiologues: {
                        none: {}
                    }
                }
            }),
            this.prisma.examenMedical.count({
                where: {
                    estAnalyse: false,
                    radiologues: {
                        some: {}
                    }
                }
            }),
            this.prisma.examenMedical.count({
                where: {
                    estAnalyse: true
                }
            }),
            this.prisma.examenMedical.count({
                where: {
                    OR: [
                        { description: { contains: 'urgent' } },
                        { description: { contains: 'critique' } }
                    ]
                }
            })
        ]);
        return {
            examensEnAttente,
            examensEnCours,
            examensTermines,
            examensUrgents
        };
    }
    async getRecentExams(radiologueID) {
        return this.prisma.examenMedical.findMany({
            where: {
                OR: [
                    { radiologues: { some: { utilisateurID: radiologueID } } },
                    { estAnalyse: false }
                ]
            },
            include: {
                patient: true,
                typeExamen: true,
                demandePar: true,
                images: true,
                radiologues: true,
            },
            orderBy: {
                dateExamen: 'desc',
            },
            take: 10,
        });
    }
    async markAsAnalyzed(examenID, resultat, radiologistID) {
        await this.checkRadiologistPermissions(examenID, radiologistID);
        return this.prisma.examenMedical.update({
            where: { examenID },
            data: {
                estAnalyse: true,
                resultat,
            },
            include: {
                patient: true,
                typeExamen: true,
                demandePar: true,
                images: true,
                radiologues: true,
            },
        });
    }
    async getTypeExamens() {
        return this.prisma.typeExamen.findMany({
            orderBy: {
                nomType: 'asc',
            },
        });
    }
    async createImage(createImageDto, radiologistID) {
        const exam = await this.prisma.examenMedical.findUnique({
            where: { examenID: createImageDto.examenID },
        });
        if (!exam) {
            throw new common_1.NotFoundException(`Examen médical avec l'ID ${createImageDto.examenID} non trouvé`);
        }
        if (radiologistID) {
            await this.checkRadiologistPermissions(createImageDto.examenID, radiologistID);
        }
        let url = createImageDto.url;
        if (!url && createImageDto.sopInstanceUID) {
            url = `/dicom/wado/${encodeURIComponent(createImageDto.sopInstanceUID)}`;
        }
        let previewUrl = null;
        if (createImageDto.orthancInstanceId) {
            previewUrl = `/dicom/instances/${createImageDto.orthancInstanceId}/preview`;
        }
        const dateAcquisition = new Date(createImageDto.dateAcquisition);
        const image = await this.prisma.imageMedicale.create({
            data: {
                examenID: createImageDto.examenID,
                studyInstanceUID: createImageDto.studyInstanceUID,
                seriesInstanceUID: createImageDto.seriesInstanceUID,
                sopInstanceUID: createImageDto.sopInstanceUID,
                dateAcquisition: dateAcquisition,
                modalite: createImageDto.modalite,
                description: createImageDto.description,
                url: url || null,
                orthancInstanceId: createImageDto.orthancInstanceId || null,
            },
        });
        await this.notificationsService.create({
            utilisateurID: exam.demandeParID,
            titre: 'Nouvelle image ajoutée',
            message: `Une nouvelle image a été ajoutée à l'examen médical du patient`,
            type: 'IMAGE_ADDED',
            lien: `/examens/${exam.examenID}`,
        });
        return image;
    }
    async getImagesByExam(examenID) {
        const exam = await this.prisma.examenMedical.findUnique({
            where: { examenID },
        });
        if (!exam) {
            throw new common_1.NotFoundException(`Examen médical avec l'ID ${examenID} non trouvé`);
        }
        return this.prisma.imageMedicale.findMany({
            where: { examenID },
            orderBy: { dateAcquisition: 'desc' },
        });
    }
    async updateImage(imageID, updateImageDto, radiologistID) {
        const image = await this.prisma.imageMedicale.findUnique({
            where: { imageID },
            include: {
                examen: {
                    include: {
                        patient: true,
                    },
                },
            },
        });
        if (!image) {
            throw new common_1.NotFoundException(`Image médicale avec l'ID ${imageID} non trouvée`);
        }
        if (radiologistID) {
            await this.checkRadiologistPermissions(image.examenID, radiologistID);
        }
        const updatedImage = await this.prisma.imageMedicale.update({
            where: { imageID },
            data: updateImageDto,
        });
        await this.notificationsService.create({
            utilisateurID: image.examen.demandeParID,
            titre: 'Image médicale mise à jour',
            message: `Une image de l'examen du patient ${image.examen.patient.prenom} ${image.examen.patient.nom} a été mise à jour`,
            type: 'IMAGE_UPDATED',
            lien: `/examens/${image.examenID}`,
        });
        return updatedImage;
    }
    async deleteImage(imageID, radiologistID) {
        const image = await this.prisma.imageMedicale.findUnique({
            where: { imageID },
            include: {
                examen: {
                    include: {
                        patient: true,
                    },
                },
            },
        });
        if (!image) {
            throw new common_1.NotFoundException(`Image médicale avec l'ID ${imageID} non trouvée`);
        }
        if (radiologistID) {
            await this.checkRadiologistPermissions(image.examenID, radiologistID);
        }
        await this.prisma.imageMedicale.delete({
            where: { imageID },
        });
        await this.notificationsService.create({
            utilisateurID: image.examen.demandeParID,
            titre: 'Image médicale supprimée',
            message: `Une image de l'examen du patient ${image.examen.patient.prenom} ${image.examen.patient.nom} a été supprimée`,
            type: 'IMAGE_DELETED',
            lien: `/examens/${image.examenID}`,
        });
    }
    async getImageCountByExam(examenID) {
        return this.prisma.imageMedicale.count({
            where: { examenID },
        });
    }
    async getExamsWithImageCounts(etablissementID) {
        const where = {};
        if (etablissementID) {
            where.demandePar = { etablissementID };
        }
        const exams = await this.prisma.examenMedical.findMany({
            where,
            include: {
                patient: {
                    select: {
                        nom: true,
                        prenom: true,
                    },
                },
                typeExamen: {
                    select: {
                        nomType: true,
                        categorie: true,
                    },
                },
                demandePar: {
                    select: {
                        nom: true,
                        prenom: true,
                        etablissementID: true,
                    },
                },
                _count: {
                    select: {
                        images: true,
                        radiologues: true,
                    },
                },
            },
            orderBy: {
                dateExamen: 'desc',
            },
        });
        return exams.map(exam => ({
            examenID: exam.examenID,
            dateExamen: exam.dateExamen,
            description: exam.description,
            estAnalyse: exam.estAnalyse,
            patientNom: exam.patient.nom,
            patientPrenom: exam.patient.prenom,
            typeExamenNom: exam.typeExamen.nomType,
            typeExamenCategorie: exam.typeExamen.categorie,
            demandeParNom: exam.demandePar.nom,
            demandeParPrenom: exam.demandePar.prenom,
            nombreImages: exam._count.images,
            nombreRadiologues: exam._count.radiologues,
        }));
    }
    async canRadiologistEditExam(examenID, radiologistID) {
        const exam = await this.prisma.examenMedical.findUnique({
            where: { examenID },
            select: {
                demandePar: {
                    select: {
                        etablissementID: true,
                    },
                },
                radiologues: {
                    select: {
                        utilisateurID: true,
                    },
                },
            },
        });
        if (!exam) {
            return false;
        }
        const isInvited = exam.radiologues.some(rad => rad.utilisateurID === radiologistID);
        if (isInvited) {
            return true;
        }
        const radiologist = await this.prisma.utilisateur.findUnique({
            where: { utilisateurID: radiologistID },
            select: { etablissementID: true },
        });
        if (!radiologist) {
            return false;
        }
        return radiologist.etablissementID === exam.demandePar.etablissementID;
    }
    async checkRadiologistPermissions(examenID, radiologistID) {
        const canEdit = await this.canRadiologistEditExam(examenID, radiologistID);
        if (!canEdit) {
            throw new common_1.ForbiddenException('Vous n\'avez pas la permission d\'éditer cet examen. ' +
                'Vous devez soit appartenir au même établissement que le médecin demandeur, ' +
                'soit être invité à collaborer sur cet examen.');
        }
    }
};
exports.ExamenMedicalService = ExamenMedicalService;
exports.ExamenMedicalService = ExamenMedicalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], ExamenMedicalService);
//# sourceMappingURL=examen-medical.service.js.map