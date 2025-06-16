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
    getAuthHeaders() {
        return {
            Authorization: `Basic ${Buffer.from(`${this.orthancUsername}:${this.orthancPassword}`).toString('base64')}`,
        };
    }
    async getStudies(userId) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.orthancUrl}/studies`, {
                headers: this.getAuthHeaders(),
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Erreur lors de la récupération des études', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getStudyDetails(studyId, userId) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.orthancUrl}/studies/${studyId}`, {
                headers: this.getAuthHeaders(),
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Erreur lors de la récupération des détails de l\'étude', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getSeries(studyId, userId) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.orthancUrl}/studies/${studyId}/series`, {
                headers: this.getAuthHeaders(),
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Erreur lors de la récupération des séries', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getSeriesDetails(seriesId, userId) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.orthancUrl}/series/${seriesId}`, {
                headers: this.getAuthHeaders(),
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Erreur lors de la récupération des détails de la série', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getInstances(seriesId, userId) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.orthancUrl}/series/${seriesId}/instances`, {
                headers: this.getAuthHeaders(),
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Erreur lors de la récupération des instances', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getInstanceDetails(instanceId, userId) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.orthancUrl}/instances/${instanceId}`, {
                headers: this.getAuthHeaders(),
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Erreur lors de la récupération des détails de l\'instance', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getDicomFile(instanceId, userId) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.orthancUrl}/instances/${instanceId}/file`, {
                headers: this.getAuthHeaders(),
                responseType: 'stream',
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Erreur lors de la récupération du fichier DICOM', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getInstancePreview(instanceId, userId, quality = 90) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.orthancUrl}/instances/${instanceId}/preview`, {
                headers: this.getAuthHeaders(),
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
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.orthancUrl}/instances`, fileBuffer, {
                headers: {
                    ...this.getAuthHeaders(),
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
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.orthancUrl}/tools/find`, {
                Level: level,
                Query: query,
            }, {
                headers: this.getAuthHeaders(),
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Erreur lors de la recherche DICOM', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getWadoImage(instanceId, contentType, userId) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.orthancUrl}/instances/${instanceId}/wado`, {
                headers: this.getAuthHeaders(),
                params: { contentType },
                responseType: 'arraybuffer',
            }));
            return {
                data: response.data,
                headers: response.headers,
            };
        }
        catch (error) {
            throw new common_1.HttpException('Erreur lors de la récupération de l\'image WADO', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
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
};
exports.OrthancService = OrthancService;
exports.OrthancService = OrthancService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService,
        prisma_service_1.PrismaService])
], OrthancService);
//# sourceMappingURL=orthanc.service.js.map