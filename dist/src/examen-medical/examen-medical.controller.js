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
var ExamenMedicalController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamenMedicalController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const examen_medical_service_1 = require("./examen-medical.service");
const dto_1 = require("./dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const public_decorator_1 = require("../common/decorators/public.decorator");
let ExamenMedicalController = ExamenMedicalController_1 = class ExamenMedicalController {
    examenMedicalService;
    logger = new common_1.Logger(ExamenMedicalController_1.name);
    constructor(examenMedicalService) {
        this.examenMedicalService = examenMedicalService;
    }
    create(createExamenMedicalDto, req) {
        return this.examenMedicalService.create(createExamenMedicalDto, req.user.utilisateurID);
    }
    getExamsWithImageCounts(etablissementID) {
        return this.examenMedicalService.getExamsWithImageCounts(etablissementID);
    }
    findAll(status, category, search) {
        return this.examenMedicalService.findAll(status, category, search);
    }
    getTypeExamens() {
        return this.examenMedicalService.getTypeExamens();
    }
    canEditExam(examenID, req) {
        const radiologistID = req.user.utilisateurID;
        return this.examenMedicalService.canRadiologistEditExam(examenID, radiologistID);
    }
    findOne(id) {
        return this.examenMedicalService.findOne(id);
    }
    update(id, updateExamenMedicalDto, req) {
        const radiologistID = req.user.role === 'RADIOLOGUE' ? req.user.utilisateurID : undefined;
        return this.examenMedicalService.update(id, updateExamenMedicalDto, radiologistID);
    }
    remove(id) {
        return this.examenMedicalService.remove(id);
    }
    findByPatient(patientID) {
        return this.examenMedicalService.findByPatient(patientID);
    }
    findByDossier(dossierID) {
        return this.examenMedicalService.findByDossier(dossierID);
    }
    inviteRadiologue(examenID, radiologueID) {
        return this.examenMedicalService.inviteRadiologue(examenID, radiologueID);
    }
    getRadiologistStats(req) {
        return this.examenMedicalService.getRadiologistStats(req.user.utilisateurID);
    }
    getRecentExams(req) {
        return this.examenMedicalService.getRecentExams(req.user.utilisateurID);
    }
    markAsAnalyzed(examenID, resultat, req) {
        const radiologistID = req.user.utilisateurID;
        return this.examenMedicalService.markAsAnalyzed(examenID, resultat.resultat, radiologistID);
    }
    getImagesByExam(examenID) {
        return this.examenMedicalService.getImagesByExam(examenID);
    }
    getImageCountByExam(examenID) {
        return this.examenMedicalService.getImageCountByExam(examenID);
    }
    async testImageExists(sopInstanceUID) {
        this.logger.log(`Test endpoint called with SOP Instance UID: ${sopInstanceUID}`);
        try {
            const image = await this.examenMedicalService.findImageBySopInstanceUID(sopInstanceUID);
            this.logger.log(`Test endpoint success - Image found: ${image.imageID}`);
            return {
                exists: true,
                imageID: image.imageID,
                sopInstanceUID: image.sopInstanceUID,
                message: 'Image found'
            };
        }
        catch (error) {
            this.logger.error(`Test endpoint error: ${error.message}`);
            return {
                exists: false,
                message: error.message
            };
        }
    }
    getImageBySopInstanceUID(sopInstanceUID) {
        this.logger.log(`Get image by SOP Instance UID called: ${sopInstanceUID}`);
        return this.examenMedicalService.findImageBySopInstanceUID(sopInstanceUID);
    }
    createImage(createImageDto, req) {
        const radiologistID = req.user.role === 'RADIOLOGUE' ? req.user.utilisateurID : undefined;
        return this.examenMedicalService.createImage(createImageDto, radiologistID);
    }
    updateImage(imageID, updateImageDto, req) {
        const radiologistID = req.user.role === 'RADIOLOGUE' ? req.user.utilisateurID : undefined;
        return this.examenMedicalService.updateImage(imageID, updateImageDto, radiologistID);
    }
    deleteImage(imageID, req) {
        const radiologistID = req.user.role === 'RADIOLOGUE' ? req.user.utilisateurID : undefined;
        return this.examenMedicalService.deleteImage(imageID, radiologistID);
    }
};
exports.ExamenMedicalController = ExamenMedicalController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)("MEDECIN", "RADIOLOGUE"),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un nouvel examen médical' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'L\'examen médical a été créé avec succès' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateExamenMedicalDto, Object]),
    __metadata("design:returntype", void 0)
], ExamenMedicalController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('liste-avec-images'),
    (0, roles_decorator_1.Roles)("MEDECIN", "RADIOLOGUE", "TECHNICIEN"),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer la liste des examens avec le nombre d\'images' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des examens avec compteurs d\'images récupérée avec succès', type: [dto_1.ExamenMedicalListDto] }),
    __param(0, (0, common_1.Query)('etablissementID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExamenMedicalController.prototype, "getExamsWithImageCounts", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)("MEDECIN", "RADIOLOGUE", "TECHNICIEN"),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer tous les examens médicaux' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des examens médicaux récupérée avec succès' }),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('category')),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ExamenMedicalController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('types'),
    (0, roles_decorator_1.Roles)("MEDECIN", "RADIOLOGUE", "TECHNICIEN"),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer tous les types d\'examens' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des types d\'examens récupérée avec succès' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExamenMedicalController.prototype, "getTypeExamens", null);
__decorate([
    (0, common_1.Get)(':id/can-edit'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE"),
    (0, swagger_1.ApiOperation)({ summary: 'Vérifier si le radiologue peut éditer cet examen' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Permission vérifiée', schema: { type: 'object', properties: { canEdit: { type: 'boolean' } } } }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ExamenMedicalController.prototype, "canEditExam", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)("MEDECIN", "RADIOLOGUE", "TECHNICIEN"),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer un examen médical par son ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Examen médical récupéré avec succès' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExamenMedicalController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)("MEDECIN", "RADIOLOGUE"),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour un examen médical' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'L\'examen médical a été mis à jour avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Permission refusée - établissement différent et non invité' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateExamenMedicalDto, Object]),
    __metadata("design:returntype", void 0)
], ExamenMedicalController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)("MEDECIN", "RADIOLOGUE"),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un examen médical' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'L\'examen médical a été supprimé avec succès' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExamenMedicalController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('patient/:patientID'),
    (0, roles_decorator_1.Roles)("MEDECIN", "RADIOLOGUE", "TECHNICIEN"),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer les examens médicaux d\'un patient' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des examens médicaux du patient récupérée avec succès' }),
    __param(0, (0, common_1.Param)('patientID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExamenMedicalController.prototype, "findByPatient", null);
__decorate([
    (0, common_1.Get)('dossier/:dossierID'),
    (0, roles_decorator_1.Roles)("MEDECIN", "RADIOLOGUE", "TECHNICIEN"),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer les examens médicaux d\'un dossier médical' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des examens médicaux du dossier récupérée avec succès' }),
    __param(0, (0, common_1.Param)('dossierID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExamenMedicalController.prototype, "findByDossier", null);
__decorate([
    (0, common_1.Put)(':id/invite-radiologue/:radiologueId'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE"),
    (0, swagger_1.ApiOperation)({ summary: "Inviter un radiologue à participer à l'examen" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Radiologue invité avec succès" }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('radiologueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ExamenMedicalController.prototype, "inviteRadiologue", null);
__decorate([
    (0, common_1.Get)('radiologue/statistiques'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE"),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer les statistiques du dashboard radiologue' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Statistiques récupérées avec succès' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ExamenMedicalController.prototype, "getRadiologistStats", null);
__decorate([
    (0, common_1.Get)('radiologue/examens-recents'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE"),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer les examens récents pour le radiologue' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Examens récents récupérés avec succès' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ExamenMedicalController.prototype, "getRecentExams", null);
__decorate([
    (0, common_1.Put)(':id/marquer-analyse'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE"),
    (0, swagger_1.ApiOperation)({ summary: 'Marquer un examen comme analysé' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Examen marqué comme analysé' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Permission refusée - établissement différent et non invité' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ExamenMedicalController.prototype, "markAsAnalyzed", null);
__decorate([
    (0, common_1.Get)(':examenId/images'),
    (0, roles_decorator_1.Roles)("MEDECIN", "RADIOLOGUE", "TECHNICIEN"),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer toutes les images d\'un examen médical' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Images de l\'examen récupérées avec succès' }),
    __param(0, (0, common_1.Param)('examenId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExamenMedicalController.prototype, "getImagesByExam", null);
__decorate([
    (0, common_1.Get)(':examenId/images/count'),
    (0, roles_decorator_1.Roles)("MEDECIN", "RADIOLOGUE", "TECHNICIEN"),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer le nombre d\'images d\'un examen médical' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Nombre d\'images récupéré avec succès' }),
    __param(0, (0, common_1.Param)('examenId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExamenMedicalController.prototype, "getImageCountByExam", null);
__decorate([
    (0, common_1.Get)('images/test/:sopInstanceUID'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Test endpoint to check if image exists by SOP Instance UID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Image exists' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Image not found' }),
    __param(0, (0, common_1.Param)('sopInstanceUID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExamenMedicalController.prototype, "testImageExists", null);
__decorate([
    (0, common_1.Get)('images/sop/:sopInstanceUID'),
    (0, roles_decorator_1.Roles)("MEDECIN", "RADIOLOGUE", "TECHNICIEN"),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer une image par son SOP Instance UID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Image récupérée avec succès', type: dto_1.ImageMedicaleDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Image not found' }),
    __param(0, (0, common_1.Param)('sopInstanceUID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExamenMedicalController.prototype, "getImageBySopInstanceUID", null);
__decorate([
    (0, common_1.Post)('images'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE", "TECHNICIEN"),
    (0, swagger_1.ApiOperation)({ summary: 'Ajouter une nouvelle image à un examen médical' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Image ajoutée avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Permission refusée - établissement différent et non invité' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateImageMedicaleDto, Object]),
    __metadata("design:returntype", void 0)
], ExamenMedicalController.prototype, "createImage", null);
__decorate([
    (0, common_1.Patch)('images/:imageId'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE", "TECHNICIEN"),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour une image médicale' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Image mise à jour avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Permission refusée - établissement différent et non invité' }),
    __param(0, (0, common_1.Param)('imageId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateImageMedicaleDto, Object]),
    __metadata("design:returntype", void 0)
], ExamenMedicalController.prototype, "updateImage", null);
__decorate([
    (0, common_1.Delete)('images/:imageId'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE", "TECHNICIEN"),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une image médicale' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Image supprimée avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Permission refusée - établissement différent et non invité' }),
    __param(0, (0, common_1.Param)('imageId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ExamenMedicalController.prototype, "deleteImage", null);
exports.ExamenMedicalController = ExamenMedicalController = ExamenMedicalController_1 = __decorate([
    (0, common_1.Controller)('examens-medicaux'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiTags)('Examens médicaux'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [examen_medical_service_1.ExamenMedicalService])
], ExamenMedicalController);
//# sourceMappingURL=examen-medical.controller.js.map