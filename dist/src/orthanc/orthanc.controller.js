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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrthancController = void 0;
const common_1 = require("@nestjs/common");
const find_dicom_dto_1 = require("./dto/find-dicom.dto");
const upload_dicom_dto_1 = require("./dto/upload-dicom.dto");
const orthanc_service_1 = require("./orthanc.service");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
let OrthancController = class OrthancController {
    orthancService;
    constructor(orthancService) {
        this.orthancService = orthancService;
    }
    async getStudies() {
        try {
            const studies = await this.orthancService.getStudies();
            return { success: true, data: studies };
        }
        catch (error) {
            return {
                success: false,
                message: 'Erreur lors de la récupération des études',
                error: error.message,
            };
        }
    }
    async getStudyDetails(studyId) {
        try {
            const study = await this.orthancService.getStudyDetails(studyId);
            return { success: true, data: study };
        }
        catch (error) {
            return {
                success: false,
                message: 'Erreur lors de la récupération des détails de l\'étude',
                error: error.message,
            };
        }
    }
    async getSeries(studyId) {
        try {
            const series = await this.orthancService.getSeries(studyId);
            return { success: true, data: series };
        }
        catch (error) {
            return {
                success: false,
                message: 'Erreur lors de la récupération des séries',
                error: error.message,
            };
        }
    }
    async getSeriesDetails(seriesId) {
        try {
            const series = await this.orthancService.getSeriesDetails(seriesId);
            return { success: true, data: series };
        }
        catch (error) {
            return {
                success: false,
                message: 'Erreur lors de la récupération des détails de la série',
                error: error.message,
            };
        }
    }
    async getInstances(seriesId) {
        try {
            const instances = await this.orthancService.getInstances(seriesId);
            return { success: true, data: instances };
        }
        catch (error) {
            return {
                success: false,
                message: 'Erreur lors de la récupération des instances',
                error: error.message,
            };
        }
    }
    async getInstanceDetails(instanceId) {
        try {
            const instance = await this.orthancService.getInstanceDetails(instanceId);
            return { success: true, data: instance };
        }
        catch (error) {
            return {
                success: false,
                message: 'Erreur lors de la récupération des détails de l\'instance',
                error: error.message,
            };
        }
    }
    async getDicomFile(instanceId, res) {
        try {
            const stream = await this.orthancService.getDicomFile(instanceId);
            stream.pipe(res);
        }
        catch (error) {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Erreur lors de la récupération du fichier DICOM',
                error: error.message,
            });
        }
    }
    async getInstancePreview(instanceId, quality, res) {
        try {
            const qualityValue = quality ? parseInt(quality, 10) : 90;
            const imageData = await this.orthancService.getInstancePreview(instanceId, qualityValue);
            res.end(imageData);
        }
        catch (error) {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Erreur lors de la récupération de l\'aperçu de l\'image',
                error: error.message,
            });
        }
    }
    async saveImageMetadata(examenId, orthancId, studyUid, modalite) {
        try {
            const result = await this.orthancService.saveImageMetadata(examenId, orthancId, studyUid, modalite);
            return { success: true, data: result };
        }
        catch (error) {
            return {
                success: false,
                message: 'Erreur lors de la sauvegarde des métadonnées',
                error: error.message,
            };
        }
    }
    async uploadDicomFile(file) {
        try {
            if (!file) {
                throw new common_1.HttpException('Aucun fichier fourni', common_1.HttpStatus.BAD_REQUEST);
            }
            const result = await this.orthancService.uploadDicomFile(file.buffer);
            return { success: true, data: result };
        }
        catch (error) {
            const statusCode = error.response?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            throw new common_1.HttpException({
                success: false,
                message: 'Erreur lors de l\'upload du fichier DICOM',
                error: error.message,
                orthancError: error.response?.data,
            }, statusCode);
        }
    }
    async findDicom(findRequest) {
        try {
            const results = await this.orthancService.findDicom(findRequest.Level, findRequest.Query);
            return { success: true, data: results };
        }
        catch (error) {
            const statusCode = error.response?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            throw new common_1.HttpException({
                success: false,
                message: 'Erreur lors de la recherche DICOM',
                error: error.message,
                orthancError: error.response?.data,
            }, statusCode);
        }
    }
    async getWadoImage(instanceId, contentType, res) {
        try {
            const { data, headers } = await this.orthancService.getWadoImage(instanceId, contentType);
            Object.keys(headers).forEach(key => {
                res.setHeader(key, headers[key]);
            });
            res.end(data);
        }
        catch (error) {
            const statusCode = error.response?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            res.status(statusCode).json({
                success: false,
                message: 'Erreur lors de la récupération de l\'image WADO',
                error: error.message,
                orthancError: error.response?.data,
            });
        }
    }
};
exports.OrthancController = OrthancController;
__decorate([
    (0, common_1.Get)('studies'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE", "MEDECIN"),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer toutes les études DICOM' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des études récupérée avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Erreur serveur' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrthancController.prototype, "getStudies", null);
__decorate([
    (0, common_1.Get)('studies/:id'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE", "MEDECIN"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrthancController.prototype, "getStudyDetails", null);
__decorate([
    (0, common_1.Get)('studies/:id/series'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE", "MEDECIN"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrthancController.prototype, "getSeries", null);
__decorate([
    (0, common_1.Get)('series/:id'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE", "MEDECIN"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrthancController.prototype, "getSeriesDetails", null);
__decorate([
    (0, common_1.Get)('series/:id/instances'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE", "MEDECIN"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrthancController.prototype, "getInstances", null);
__decorate([
    (0, common_1.Get)('instances/:id'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE", "MEDECIN"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrthancController.prototype, "getInstanceDetails", null);
__decorate([
    (0, common_1.Get)('instances/:id/file'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE", "MEDECIN"),
    (0, common_1.Header)('Content-Type', 'application/dicom'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrthancController.prototype, "getDicomFile", null);
__decorate([
    (0, common_1.Get)('instances/:id/preview'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE", "MEDECIN"),
    (0, common_1.Header)('Content-Type', 'image/jpeg'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('quality')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], OrthancController.prototype, "getInstancePreview", null);
__decorate([
    (0, common_1.Get)('save-metadata'),
    (0, roles_decorator_1.Roles)('RADIOLOGUE', 'MEDECIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Sauvegarder les métadonnées d\'une image DICOM' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Métadonnées sauvegardées avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Erreur serveur' }),
    __param(0, (0, common_1.Query)('examenId')),
    __param(1, (0, common_1.Query)('orthancId')),
    __param(2, (0, common_1.Query)('studyUid')),
    __param(3, (0, common_1.Query)('modalite')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], OrthancController.prototype, "saveImageMetadata", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, roles_decorator_1.Roles)('RADIOLOGUE', 'MEDECIN'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiOperation)({ summary: 'Uploader un fichier DICOM (C-STORE)' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: upload_dicom_dto_1.UploadDicomDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Fichier DICOM uploadé avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Fichier DICOM invalide' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Erreur serveur' }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrthancController.prototype, "uploadDicomFile", null);
__decorate([
    (0, common_1.Post)('find'),
    (0, roles_decorator_1.Roles)('RADIOLOGUE', 'MEDECIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Rechercher des études DICOM (C-FIND)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Résultats de recherche' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Requête invalide' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Erreur serveur' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_dicom_dto_1.FindDicomDto]),
    __metadata("design:returntype", Promise)
], OrthancController.prototype, "findDicom", null);
__decorate([
    (0, common_1.Get)('wado/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer une image DICOM via WADO-GET' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Image récupérée avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Image non trouvée' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Erreur serveur' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('contentType')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], OrthancController.prototype, "getWadoImage", null);
exports.OrthancController = OrthancController = __decorate([
    (0, common_1.Controller)('dicom'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiTags)('DICOM'),
    __metadata("design:paramtypes", [orthanc_service_1.OrthancService])
], OrthancController);
//# sourceMappingURL=orthanc.controller.js.map