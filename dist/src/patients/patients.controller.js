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
exports.PatientsController = void 0;
const common_1 = require("@nestjs/common");
const patients_service_1 = require("./patients.service");
const create_patient_dto_1 = require("./dto/create-patient.dto");
const update_patient_dto_1 = require("./dto/update-patient.dto");
const create_medical_record_dto_1 = require("./dto/create-medical-record.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_1 = require("../common/constants/roles");
const log_activity_decorator_1 = require("../common/decorators/log-activity.decorator");
let PatientsController = class PatientsController {
    patientsService;
    constructor(patientsService) {
        this.patientsService = patientsService;
    }
    getUserId(req) {
        if (!req.user || !req.user['utilisateurID']) {
            throw new common_1.UnauthorizedException('Utilisateur non authentifié');
        }
        return req.user['utilisateurID'];
    }
    create(createPatientDto, req) {
        return this.patientsService.create(createPatientDto, this.getUserId(req));
    }
    findAll() {
        return this.patientsService.findAll();
    }
    findOne(id) {
        return this.patientsService.findOne(id);
    }
    update(id, updatePatientDto, req) {
        return this.patientsService.update(id, updatePatientDto);
    }
    remove(id) {
        return this.patientsService.remove(id);
    }
    createMedicalRecord(id, createMedicalRecordDto, req) {
        return this.patientsService.createMedicalRecord(id, createMedicalRecordDto, req.user.userId);
    }
    getMedicalRecord(id) {
        return this.patientsService.getMedicalRecord(id);
    }
    updateMedicalRecord(id, updateMedicalRecordDto) {
        return this.patientsService.updateMedicalRecord(id, updateMedicalRecordDto);
    }
};
exports.PatientsController = PatientsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(roles_1.UserRole.ADMINISTRATEUR, roles_1.UserRole.RECEPTIONNISTE, roles_1.UserRole.MEDECIN),
    (0, log_activity_decorator_1.LogActivity)({
        typeAction: 'CREATION_PATIENT',
        description: (result) => `Création d'un nouveau patient: ${result.nom} ${result.prenom}`,
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un nouveau patient' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Patient créé avec succès' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_patient_dto_1.CreatePatientDto, Object]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(roles_1.UserRole.ADMINISTRATEUR, roles_1.UserRole.RECEPTIONNISTE, roles_1.UserRole.MEDECIN, roles_1.UserRole.RADIOLOGUE),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer la liste des patients avec pagination et filtrage' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des patients récupérée avec succès' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(roles_1.UserRole.ADMINISTRATEUR, roles_1.UserRole.RECEPTIONNISTE, roles_1.UserRole.MEDECIN, roles_1.UserRole.RADIOLOGUE),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer un patient par son ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Patient récupéré avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Patient non trouvé' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(roles_1.UserRole.ADMINISTRATEUR, roles_1.UserRole.RECEPTIONNISTE, roles_1.UserRole.MEDECIN),
    (0, log_activity_decorator_1.LogActivity)({
        typeAction: 'MODIFICATION_PATIENT',
        description: (result) => `Modification du patient: ${result.nom} ${result.prenom}`,
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour un patient' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Patient mis à jour avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Patient non trouvé' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_patient_dto_1.UpdatePatientDto, Object]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(roles_1.UserRole.ADMINISTRATEUR),
    (0, log_activity_decorator_1.LogActivity)({
        typeAction: 'SUPPRESSION_PATIENT',
        description: (result) => `Suppression du patient: ${result.nom} ${result.prenom}`,
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un patient' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Patient supprimé avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Patient non trouvé' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/medical-record'),
    (0, roles_decorator_1.Roles)('ADMINISTRATEUR', 'MEDECIN', 'RADIOLOGUE'),
    (0, log_activity_decorator_1.LogActivity)({
        typeAction: 'CREATION_DOSSIER_MEDICAL',
        description: 'Création d\'un dossier médical pour un patient',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_medical_record_dto_1.CreateMedicalRecordDto, Object]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "createMedicalRecord", null);
__decorate([
    (0, common_1.Get)(':id/medical-record'),
    (0, roles_decorator_1.Roles)('ADMINISTRATEUR', 'MEDECIN', 'RADIOLOGUE'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "getMedicalRecord", null);
__decorate([
    (0, common_1.Patch)(':id/medical-record'),
    (0, roles_decorator_1.Roles)('ADMINISTRATEUR', 'MEDECIN', 'RADIOLOGUE'),
    (0, log_activity_decorator_1.LogActivity)({
        typeAction: 'MODIFICATION_DOSSIER_MEDICAL',
        description: 'Modification d\'un dossier médical',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_medical_record_dto_1.CreateMedicalRecordDto]),
    __metadata("design:returntype", void 0)
], PatientsController.prototype, "updateMedicalRecord", null);
exports.PatientsController = PatientsController = __decorate([
    (0, swagger_1.ApiTags)('patients'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('patients'),
    __metadata("design:paramtypes", [patients_service_1.PatientsService])
], PatientsController);
//# sourceMappingURL=patients.controller.js.map