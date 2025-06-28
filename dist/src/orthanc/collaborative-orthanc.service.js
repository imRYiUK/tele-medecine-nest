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
var CollaborativeOrthancService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollaborativeOrthancService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const rxjs_1 = require("rxjs");
let CollaborativeOrthancService = CollaborativeOrthancService_1 = class CollaborativeOrthancService {
    httpService;
    configService;
    prisma;
    logger = new common_1.Logger(CollaborativeOrthancService_1.name);
    constructor(httpService, configService, prisma) {
        this.httpService = httpService;
        this.configService = configService;
        this.prisma = prisma;
    }
    async getCollaborativeImagePreview(sopInstanceUID, userId, quality = 90) {
        this.logger.log(`Collaborative preview request - sopInstanceUID: ${sopInstanceUID}, userId: ${userId}`);
        const image = await this.prisma.imageMedicale.findFirst({
            where: { sopInstanceUID },
            include: {
                collaborations: {
                    where: {
                        OR: [
                            { inviterID: userId },
                            { inviteeID: userId }
                        ],
                        status: 'ACCEPTED'
                    },
                    include: {
                        inviter: true,
                        invitee: true
                    }
                },
                examen: {
                    include: {
                        demandePar: true,
                        radiologues: true
                    }
                }
            }
        });
        if (!image) {
            throw new common_1.NotFoundException(`Image with SOP Instance UID ${sopInstanceUID} not found`);
        }
        const hasAccess = await this.checkUserAccessToImage(image, userId);
        if (!hasAccess) {
            throw new common_1.ForbiddenException('You do not have access to this image');
        }
        console.log('image2', image);
        const orthancConfig = await this.getOrthancConfigForImageOwner(image, userId);
        console.log('orthancConfig', orthancConfig);
        if (!image.sopInstanceUID) {
            throw new common_1.NotFoundException('Orthanc instance ID not found for this image');
        }
        const previewData = await this.getImagePreviewFromOrthanc(image.sopInstanceUID, orthancConfig, quality);
        this.logger.log(`Collaborative preview served successfully for user ${userId}`);
        return previewData;
    }
    async getCollaborativeDicomFile(sopInstanceUID, userId) {
        this.logger.log(`Collaborative file request - sopInstanceUID: ${sopInstanceUID}, userId: ${userId}`);
        const image = await this.prisma.imageMedicale.findFirst({
            where: { sopInstanceUID },
            include: {
                collaborations: {
                    where: {
                        OR: [
                            { inviterID: userId },
                            { inviteeID: userId }
                        ],
                        status: 'ACCEPTED'
                    },
                    include: {
                        inviter: true,
                        invitee: true
                    }
                },
                examen: {
                    include: {
                        demandePar: true,
                        radiologues: true
                    }
                }
            }
        });
        if (!image) {
            throw new common_1.NotFoundException(`Image with SOP Instance UID ${sopInstanceUID} not found`);
        }
        const hasAccess = await this.checkUserAccessToImage(image, userId);
        if (!hasAccess) {
            throw new common_1.ForbiddenException('You do not have access to this image');
        }
        console.log('image1', image);
        const orthancConfig = await this.getOrthancConfigForImageOwner(image, userId);
        if (!image.orthancInstanceId) {
            throw new common_1.NotFoundException('Orthanc instance ID not found for this image');
        }
        const fileData = await this.getDicomFileFromOrthanc(image.orthancInstanceId, orthancConfig);
        this.logger.log(`Collaborative file served successfully for user ${userId}`);
        return fileData;
    }
    async checkUserAccessToImage(image, userId) {
        if (image.examen.demandeParID === userId) {
            return true;
        }
        const isAssignedRadiologist = image.examen.radiologues.some((r) => r.utilisateurID === userId);
        if (isAssignedRadiologist) {
            return true;
        }
        const hasCollaboration = image.collaborations.some((c) => c.status === 'ACCEPTED' && (c.inviterID === userId || c.inviteeID === userId));
        if (hasCollaboration) {
            return true;
        }
        return false;
    }
    async getOrthancConfigForImageOwner(image, userId) {
        if (image.examen.demandeParID === userId) {
            return await this.getOrthancConfigForUser(userId);
        }
        const isAssignedRadiologist = image.examen.radiologues.some((r) => r.utilisateurID === userId);
        if (isAssignedRadiologist) {
            return await this.getOrthancConfigForUser(userId);
        }
        const collaboration = image.collaborations.find((c) => c.status === 'ACCEPTED' && (c.inviterID === userId || c.inviteeID === userId));
        if (collaboration) {
            const inviterId = collaboration.inviterID === userId ? collaboration.inviterID : collaboration.inviterID;
            return await this.getOrthancConfigForUser(inviterId);
        }
        throw new common_1.ForbiddenException('Unable to determine image owner configuration');
    }
    async getOrthancConfigForUser(userId) {
        const user = await this.prisma.utilisateur.findUnique({
            where: { utilisateurID: userId },
            include: {
                etablissement: true
            }
        });
        if (!user) {
            throw new common_1.NotFoundException(`User ${userId} not found`);
        }
        const orthancUrl = user.etablissement?.orthancUrl || this.configService.get('ORTHANC_URL') || 'http://localhost:8042';
        const orthancUsername = user.etablissement?.orthancLogin || this.configService.get('ORTHANC_USERNAME') || 'orthanc';
        const orthancPassword = user.etablissement?.orthancPassword || this.configService.get('ORTHANC_PASSWORD') || 'orthanc';
        return {
            url: orthancUrl,
            login: orthancUsername,
            password: orthancPassword
        };
    }
    async getImagePreviewFromOrthanc(orthancInstanceId, orthancConfig, quality) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${orthancConfig.url}/instances/${orthancInstanceId}/preview`, {
                params: { quality },
                headers: this.getAuthHeaders(orthancConfig.login, orthancConfig.password),
                responseType: 'arraybuffer',
            }));
            return Buffer.from(response.data);
        }
        catch (error) {
            this.logger.error(`Error getting preview from Orthanc: ${error.message}`);
            throw new Error(`Failed to get image preview: ${error.message}`);
        }
    }
    async getDicomFileFromOrthanc(orthancInstanceId, orthancConfig) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${orthancConfig.url}/instances/${orthancInstanceId}/file`, {
                headers: this.getAuthHeaders(orthancConfig.login, orthancConfig.password),
                responseType: 'arraybuffer',
            }));
            return Buffer.from(response.data);
        }
        catch (error) {
            this.logger.error(`Error getting DICOM file from Orthanc: ${error.message}`);
            throw new Error(`Failed to get DICOM file: ${error.message}`);
        }
    }
    getAuthHeaders(username, password) {
        const auth = Buffer.from(`${username}:${password}`).toString('base64');
        return {
            'Authorization': `Basic ${auth}`,
        };
    }
};
exports.CollaborativeOrthancService = CollaborativeOrthancService;
exports.CollaborativeOrthancService = CollaborativeOrthancService = CollaborativeOrthancService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService,
        prisma_service_1.PrismaService])
], CollaborativeOrthancService);
//# sourceMappingURL=collaborative-orthanc.service.js.map