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
const rxjs_1 = require("rxjs");
const config_1 = require("@nestjs/config");
const journal_activity_service_1 = require("../journal/journal-activity.service");
let OrthancService = class OrthancService {
    httpService;
    configService;
    journalActivityService;
    baseUrl;
    auth;
    constructor(httpService, configService, journalActivityService) {
        this.httpService = httpService;
        this.configService = configService;
        this.journalActivityService = journalActivityService;
        this.baseUrl = this.configService.get('ORTHANC_URL') || 'http://localhost:8042';
        this.auth = {
            username: this.configService.get('ORTHANC_USERNAME') || 'orthanc',
            password: this.configService.get('ORTHANC_PASSWORD') || 'orthanc',
        };
    }
    async getStudies(userId) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.baseUrl}/studies`, {
            auth: this.auth,
        }));
        await this.journalActivityService.logActivity({
            utilisateurID: userId,
            typeAction: 'CONSULTATION_ETUDES',
            description: 'Consultation de la liste des études DICOM',
        });
        return response.data;
    }
    async getStudyDetails(studyId, userId) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.baseUrl}/studies/${studyId}`, {
            auth: this.auth,
        }));
        await this.journalActivityService.logActivity({
            utilisateurID: userId,
            typeAction: 'CONSULTATION_ETUDE',
            description: `Consultation des détails de l'étude DICOM: ${studyId}`,
        });
        return response.data;
    }
    async getSeries(studyId, userId) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.baseUrl}/studies/${studyId}/series`, {
            auth: this.auth,
        }));
        await this.journalActivityService.logActivity({
            utilisateurID: userId,
            typeAction: 'CONSULTATION_SERIES',
            description: `Consultation des séries de l'étude DICOM: ${studyId}`,
        });
        return response.data;
    }
    async getSeriesDetails(seriesId, userId) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.baseUrl}/series/${seriesId}`, {
            auth: this.auth,
        }));
        await this.journalActivityService.logActivity({
            utilisateurID: userId,
            typeAction: 'CONSULTATION_SERIE',
            description: `Consultation des détails de la série DICOM: ${seriesId}`,
        });
        return response.data;
    }
    async getInstances(seriesId, userId) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.baseUrl}/series/${seriesId}/instances`, {
            auth: this.auth,
        }));
        await this.journalActivityService.logActivity({
            utilisateurID: userId,
            typeAction: 'CONSULTATION_INSTANCES',
            description: `Consultation des instances de la série DICOM: ${seriesId}`,
        });
        return response.data;
    }
    async getInstanceDetails(instanceId, userId) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.baseUrl}/instances/${instanceId}`, {
            auth: this.auth,
        }));
        await this.journalActivityService.logActivity({
            utilisateurID: userId,
            typeAction: 'CONSULTATION_INSTANCE',
            description: `Consultation des détails de l'instance DICOM: ${instanceId}`,
        });
        return response.data;
    }
    async getDicomFile(instanceId, userId) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.baseUrl}/instances/${instanceId}/file`, {
            auth: this.auth,
            responseType: 'stream',
        }));
        await this.journalActivityService.logActivity({
            utilisateurID: userId,
            typeAction: 'TELECHARGEMENT_DICOM',
            description: `Téléchargement du fichier DICOM: ${instanceId}`,
        });
        return response.data;
    }
    async getInstancePreview(instanceId, userId, quality = 90) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.baseUrl}/instances/${instanceId}/preview`, {
            auth: this.auth,
            params: { quality },
            responseType: 'arraybuffer',
        }));
        await this.journalActivityService.logActivity({
            utilisateurID: userId,
            typeAction: 'CONSULTATION_APERCU',
            description: `Consultation de l'aperçu de l'instance DICOM: ${instanceId}`,
        });
        return response.data;
    }
    async saveImageMetadata(examenId, orthancId, studyUid, modalite) {
        return {
            message: 'Métadonnées sauvegardées avec succès',
            examenId,
            orthancId,
            studyUid,
            modalite,
        };
    }
    async uploadDicomFile(fileBuffer, userId) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.baseUrl}/instances`, fileBuffer, {
            auth: this.auth,
            headers: {
                'Content-Type': 'application/dicom',
            },
        }));
        await this.journalActivityService.logActivity({
            utilisateurID: userId,
            typeAction: 'UPLOAD_DICOM',
            description: `Upload d'un nouveau fichier DICOM`,
        });
        return response.data;
    }
    async findDicom(level, query, userId) {
        const validLevels = ['Patient', 'Study', 'Series', 'Instance'];
        if (!validLevels.includes(level)) {
            throw new common_1.HttpException(`Niveau de recherche invalide. Valeurs acceptées: ${validLevels.join(', ')}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.baseUrl}/tools/find`, {
            Level: level,
            Query: query,
        }, {
            auth: this.auth,
        }));
        await this.journalActivityService.logActivity({
            utilisateurID: userId,
            typeAction: 'RECHERCHE_DICOM',
            description: `Recherche DICOM au niveau: ${level}`,
        });
        return response.data;
    }
    async getWadoImage(instanceId, contentType = 'image/jpeg', userId) {
        try {
            await this.getInstanceDetails(instanceId, userId);
        }
        catch (error) {
            if (error.response?.status === 404) {
                throw new common_1.HttpException('Instance non trouvée', common_1.HttpStatus.NOT_FOUND);
            }
            throw error;
        }
        let endpoint = `${this.baseUrl}/instances/${instanceId}/preview`;
        let responseType = 'arraybuffer';
        let params = {};
        if (contentType === 'application/dicom') {
            endpoint = `${this.baseUrl}/instances/${instanceId}/file`;
        }
        else if (contentType.startsWith('image/')) {
            endpoint = `${this.baseUrl}/instances/${instanceId}/rendered`;
            params = {
                format: contentType.split('/')[1],
                quality: '90'
            };
        }
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(endpoint, {
            auth: this.auth,
            responseType,
            params,
        }));
        return {
            data: response.data,
            headers: {
                'Content-Type': contentType,
                'Content-Length': response.headers['content-length'],
                'Cache-Control': 'max-age=3600',
            },
        };
    }
};
exports.OrthancService = OrthancService;
exports.OrthancService = OrthancService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService,
        journal_activity_service_1.JournalActivityService])
], OrthancService);
//# sourceMappingURL=orthanc.service.js.map