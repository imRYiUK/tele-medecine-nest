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
exports.CollaborativeOrthancController = void 0;
const common_1 = require("@nestjs/common");
const collaborative_orthanc_service_1 = require("./collaborative-orthanc.service");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_1 = require("../common/constants/roles");
let CollaborativeOrthancController = class CollaborativeOrthancController {
    collaborativeOrthancService;
    constructor(collaborativeOrthancService) {
        this.collaborativeOrthancService = collaborativeOrthancService;
    }
    getUserId(req) {
        const user = req.user;
        if (!user || !user.utilisateurID) {
            throw new common_1.UnauthorizedException('User not authenticated');
        }
        return user.utilisateurID;
    }
    async getCollaborativeImagePreview(sopInstanceUID, quality, res, req) {
        try {
            const userId = this.getUserId(req);
            const qualityValue = quality ? parseInt(quality, 10) : 90;
            const imageData = await this.collaborativeOrthancService.getCollaborativeImagePreview(sopInstanceUID, userId, qualityValue);
            res.setHeader('Content-Type', 'image/jpeg');
            res.setHeader('Cache-Control', 'public, max-age=3600');
            res.end(imageData);
        }
        catch (error) {
            const statusCode = error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            res.status(statusCode).json({
                success: false,
                message: 'Erreur lors de la récupération de l\'aperçu collaboratif',
                error: error.message,
            });
        }
    }
    async getCollaborativeDicomFile(sopInstanceUID, res, req) {
        try {
            const userId = this.getUserId(req);
            const fileData = await this.collaborativeOrthancService.getCollaborativeDicomFile(sopInstanceUID, userId);
            res.setHeader('Content-Type', 'application/dicom');
            res.setHeader('Content-Disposition', `attachment; filename="dicom-${sopInstanceUID}.dcm"`);
            res.setHeader('Cache-Control', 'public, max-age=3600');
            res.end(fileData);
        }
        catch (error) {
            const statusCode = error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            res.status(statusCode).json({
                success: false,
                message: 'Erreur lors du téléchargement du fichier DICOM collaboratif',
                error: error.message,
            });
        }
    }
};
exports.CollaborativeOrthancController = CollaborativeOrthancController;
__decorate([
    (0, common_1.Get)('instances/:sopInstanceUID/preview'),
    (0, roles_decorator_1.Roles)(roles_1.UserRole.RADIOLOGUE, roles_1.UserRole.MEDECIN),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer l\'aperçu d\'une image DICOM en mode collaboratif' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Aperçu de l\'image récupéré avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Accès refusé' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Image non trouvée' }),
    __param(0, (0, common_1.Param)('sopInstanceUID')),
    __param(1, (0, common_1.Query)('quality')),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], CollaborativeOrthancController.prototype, "getCollaborativeImagePreview", null);
__decorate([
    (0, common_1.Get)('instances/:sopInstanceUID/file'),
    (0, roles_decorator_1.Roles)(roles_1.UserRole.RADIOLOGUE, roles_1.UserRole.MEDECIN),
    (0, swagger_1.ApiOperation)({ summary: 'Télécharger un fichier DICOM en mode collaboratif' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Fichier DICOM téléchargé avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Accès refusé' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Image non trouvée' }),
    __param(0, (0, common_1.Param)('sopInstanceUID')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CollaborativeOrthancController.prototype, "getCollaborativeDicomFile", null);
exports.CollaborativeOrthancController = CollaborativeOrthancController = __decorate([
    (0, common_1.Controller)('dicom/collaborative'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiTags)('Collaborative DICOM'),
    __metadata("design:paramtypes", [collaborative_orthanc_service_1.CollaborativeOrthancService])
], CollaborativeOrthancController);
//# sourceMappingURL=collaborative-orthanc.controller.js.map