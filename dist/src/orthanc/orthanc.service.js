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
exports.OrthancService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const prisma_service_1 = require("../prisma/prisma.service");
let OrthancService = class OrthancService {
    httpService;
    configService;
    prisma;
    orthancUrl;
    orthancUsername;
    orthancPassword;
    constructor(httpService, configService, prisma) {
        this.httpService = httpService;
        this.configService = configService;
        this.prisma = prisma;
        this.orthancUrl = this.configService.get('ORTHANC_URL') || 'http://localhost:8042';
        this.orthancUsername = this.configService.get('ORTHANC_USERNAME') || 'orthanc';
        this.orthancPassword = this.configService.get('ORTHANC_PASSWORD') || 'orthanc';
    }
    async getOrthancConfigForUser(userId) {
        try {
            const user = await this.prisma.utilisateur.findUnique({
                where: { utilisateurID: userId },
                select: {
                    utilisateurID: true,
                    etablissement: {
                        select: {
                            orthancUrl: true,
                            orthancLogin: true,
                            orthancPassword: true,
                        },
                    },
                },
            });
            if (!user) {
                console.warn(`[OrthancService] User ${userId} not found, using global config`);
                return {
                    url: this.orthancUrl,
                    login: this.orthancUsername,
                    password: this.orthancPassword,
                };
            }
            const etab = user.etablissement;
            console.log(`[OrthancService] User ${userId} establishment config:`, {
                hasEstablishment: !!etab,
                orthancUrl: etab?.orthancUrl,
                orthancLogin: etab?.orthancLogin,
                hasOrthancPassword: !!etab?.orthancPassword,
            });
            const hasEstablishmentConfig = etab && (etab.orthancUrl || etab.orthancLogin || etab.orthancPassword);
            if (!hasEstablishmentConfig) {
                console.log(`[OrthancService] User ${userId} has no establishment Orthanc config, using global config`);
            }
            const url = etab?.orthancUrl || this.orthancUrl;
            const login = etab?.orthancLogin || this.orthancUsername;
            const password = etab?.orthancPassword || this.orthancPassword;
            console.log(`[OrthancService] Using Orthanc config:`, {
                url,
                login,
                hasPassword: !!password,
                isUsingEstablishmentConfig: hasEstablishmentConfig,
            });
            return { url, login, password };
        }
        catch (error) {
            console.error(`[OrthancService] Error getting Orthanc config for user ${userId}:`, error);
            return {
                url: this.orthancUrl,
                login: this.orthancUsername,
                password: this.orthancPassword,
            };
        }
    }
    getAuthHeaders(login, password) {
        return {
            Authorization: `Basic ${Buffer.from(`${login}:${password}`).toString('base64')}`,
        };
    }
    async getStudies(userId) {
        const { url, login, password } = await this.getOrthancConfigForUser(userId);
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${url}/studies`, {
                headers: this.getAuthHeaders(login, password),
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Erreur lors de la récupération des études', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getStudyDetails(studyId, userId) {
        const { url, login, password } = await this.getOrthancConfigForUser(userId);
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${url}/studies/${studyId}`, {
                headers: this.getAuthHeaders(login, password),
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Erreur lors de la récupération des détails de l\'étude', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getSeries(studyId, userId) {
        const { url, login, password } = await this.getOrthancConfigForUser(userId);
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${url}/studies/${studyId}/series`, {
                headers: this.getAuthHeaders(login, password),
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Erreur lors de la récupération des séries', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getSeriesDetails(seriesId, userId) {
        const { url, login, password } = await this.getOrthancConfigForUser(userId);
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${url}/series/${seriesId}`, {
                headers: this.getAuthHeaders(login, password),
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Erreur lors de la récupération des détails de la série', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getInstances(seriesId, userId) {
        const { url, login, password } = await this.getOrthancConfigForUser(userId);
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${url}/series/${seriesId}/instances`, {
                headers: this.getAuthHeaders(login, password),
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Erreur lors de la récupération des instances', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getInstanceDetails(instanceId, userId) {
        const { url, login, password } = await this.getOrthancConfigForUser(userId);
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${url}/instances/${instanceId}`, {
                headers: this.getAuthHeaders(login, password),
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Erreur lors de la récupération des détails de l\'instance', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getDicomFile(instanceId, userId) {
        const { url, login, password } = await this.getOrthancConfigForUser(userId);
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${url}/instances/${instanceId}/file`, {
                headers: this.getAuthHeaders(login, password),
                responseType: 'stream',
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Erreur lors de la récupération du fichier DICOM', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getInstancePreview(instanceId, userId, quality = 90) {
        const { url, login, password } = await this.getOrthancConfigForUser(userId);
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${url}/instances/${instanceId}/preview`, {
                headers: this.getAuthHeaders(login, password),
                params: { quality },
                responseType: 'arraybuffer',
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Erreur lors de la récupération de l\'aperçu', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async uploadDicomFile(fileBuffer, userId) {
        const { url, login, password } = await this.getOrthancConfigForUser(userId);
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${url}/instances`, fileBuffer, {
                headers: {
                    ...this.getAuthHeaders(login, password),
                    'Content-Type': 'application/dicom',
                },
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Erreur lors de l\'upload du fichier DICOM', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findDicom(level, query, userId) {
        const { url, login, password } = await this.getOrthancConfigForUser(userId);
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${url}/tools/find`, {
                Level: level,
                Query: query,
            }, {
                headers: this.getAuthHeaders(login, password),
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Erreur lors de la recherche DICOM', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getWadoImage(instanceId, contentType, userId) {
        const { url, login, password } = await this.getOrthancConfigForUser(userId);
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${url}/instances/${instanceId}/wado`, {
                headers: this.getAuthHeaders(login, password),
                params: { contentType },
                responseType: 'arraybuffer',
            }));
            return {
                data: response.data,
                headers: Object.fromEntries(Object.entries(response.headers).map(([k, v]) => [k, String(v)])),
            };
        }
        catch (error) {
            throw new common_1.HttpException("Erreur lors de la récupération de l'image WADO", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async saveImageMetadata(examenId, orthancId, studyUid, modalite) {
        try {
            const image = await this.prisma.imageMedicale.create({
                data: {
                    examenID: examenId,
                    studyInstanceUID: studyUid,
                    seriesInstanceUID: orthancId,
                    sopInstanceUID: orthancId,
                    dateAcquisition: new Date(),
                    modalite,
                    description: `Image DICOM - ${modalite}`,
                },
            });
            return image;
        }
        catch (error) {
            throw new common_1.HttpException('Erreur lors de la sauvegarde des métadonnées', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getDicomTags(instanceId, userId) {
        const { url, login, password } = await this.getOrthancConfigForUser(userId);
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${url}/instances/${instanceId}/tags?short`, {
                headers: this.getAuthHeaders(login, password),
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Erreur lors de la récupération des tags DICOM', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    extractAcquisitionDate(tags) {
        const acq = tags['0008,0022'] || tags['0008,0020'];
        if (!acq)
            return null;
        return `${acq.slice(0, 4)}-${acq.slice(4, 6)}-${acq.slice(6, 8)}T00:00:00.000Z`;
    }
    extractModality(tags) {
        return tags['0008,0060'] || null;
    }
    async getInstanceAcquisitionAndModality(instanceId, userId) {
        const tags = await this.getDicomTags(instanceId, userId);
        return {
            acquisitionDate: this.extractAcquisitionDate(tags),
            modality: this.extractModality(tags),
        };
    }
};
exports.OrthancService = OrthancService;
exports.OrthancService = OrthancService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService,
        prisma_service_1.PrismaService])
], OrthancService);
//# sourceMappingURL=orthanc.service.js.map