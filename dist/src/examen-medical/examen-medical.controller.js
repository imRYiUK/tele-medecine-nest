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
exports.ExamenMedicalController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const examen_medical_service_1 = require("./examen-medical.service");
const create_examen_medical_dto_1 = require("./dto/create-examen-medical.dto");
const update_examen_medical_dto_1 = require("./dto/update-examen-medical.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
let ExamenMedicalController = class ExamenMedicalController {
    examenMedicalService;
    constructor(examenMedicalService) {
        this.examenMedicalService = examenMedicalService;
    }
    create(createExamenMedicalDto, req) {
        return this.examenMedicalService.create(createExamenMedicalDto, req.user.utilisateurID);
    }
    findAll() {
        return this.examenMedicalService.findAll();
    }
    findOne(id) {
        return this.examenMedicalService.findOne(id);
    }
    update(id, updateExamenMedicalDto) {
        return this.examenMedicalService.update(id, updateExamenMedicalDto);
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
    __metadata("design:paramtypes", [create_examen_medical_dto_1.CreateExamenMedicalDto, Object]),
    __metadata("design:returntype", void 0)
], ExamenMedicalController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)("MEDECIN", "RADIOLOGUE", "TECHNICIEN"),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer tous les examens médicaux' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des examens médicaux récupérée avec succès' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExamenMedicalController.prototype, "findAll", null);
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
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_examen_medical_dto_1.UpdateExamenMedicalDto]),
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
exports.ExamenMedicalController = ExamenMedicalController = __decorate([
    (0, common_1.Controller)('examens-medicaux'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiTags)('Examens médicaux'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [examen_medical_service_1.ExamenMedicalService])
], ExamenMedicalController);
//# sourceMappingURL=examen-medical.controller.js.map