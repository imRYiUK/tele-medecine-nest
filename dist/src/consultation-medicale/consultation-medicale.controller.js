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
exports.ConsultationMedicaleController = void 0;
const common_1 = require("@nestjs/common");
const consultation_medicale_service_1 = require("./consultation-medicale.service");
const create_consultation_medicale_dto_1 = require("./dto/create-consultation-medicale.dto");
const update_consultation_medicale_dto_1 = require("./dto/update-consultation-medicale.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
let ConsultationMedicaleController = class ConsultationMedicaleController {
    consultationMedicaleService;
    constructor(consultationMedicaleService) {
        this.consultationMedicaleService = consultationMedicaleService;
    }
    create(createConsultationMedicaleDto, req) {
        return this.consultationMedicaleService.create(createConsultationMedicaleDto, req.user.userId);
    }
    findAll() {
        return this.consultationMedicaleService.findAll();
    }
    findOne(id) {
        return this.consultationMedicaleService.findOne(id);
    }
    update(id, updateConsultationMedicaleDto) {
        return this.consultationMedicaleService.update(id, updateConsultationMedicaleDto);
    }
    remove(id) {
        return this.consultationMedicaleService.remove(id);
    }
    findByPatient(patientId) {
        return this.consultationMedicaleService.findByPatient(patientId);
    }
    findByDossier(dossierId) {
        return this.consultationMedicaleService.findByDossier(dossierId);
    }
    findByMedecin(medecinId) {
        return this.consultationMedicaleService.findByMedecin(medecinId);
    }
};
exports.ConsultationMedicaleController = ConsultationMedicaleController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)("MEDECIN"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_consultation_medicale_dto_1.CreateConsultationMedicaleDto, Object]),
    __metadata("design:returntype", void 0)
], ConsultationMedicaleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)("ADMIN", "SUPER_ADMIN"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConsultationMedicaleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)("ADMIN", "SUPER_ADMIN", "MEDECIN"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConsultationMedicaleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)("MEDECIN"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_consultation_medicale_dto_1.UpdateConsultationMedicaleDto]),
    __metadata("design:returntype", void 0)
], ConsultationMedicaleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)("ADMIN", "SUPER_ADMIN"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConsultationMedicaleController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('patient/:patientId'),
    (0, roles_decorator_1.Roles)("ADMIN", "SUPER_ADMIN", "MEDECIN"),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConsultationMedicaleController.prototype, "findByPatient", null);
__decorate([
    (0, common_1.Get)('dossier/:dossierId'),
    (0, roles_decorator_1.Roles)("ADMIN", "SUPER_ADMIN", "MEDECIN"),
    __param(0, (0, common_1.Param)('dossierId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConsultationMedicaleController.prototype, "findByDossier", null);
__decorate([
    (0, common_1.Get)('medecin/:medecinId'),
    (0, roles_decorator_1.Roles)("ADMIN", "SUPER_ADMIN"),
    __param(0, (0, common_1.Param)('medecinId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConsultationMedicaleController.prototype, "findByMedecin", null);
exports.ConsultationMedicaleController = ConsultationMedicaleController = __decorate([
    (0, common_1.Controller)('consultations'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [consultation_medicale_service_1.ConsultationMedicaleService])
], ConsultationMedicaleController);
//# sourceMappingURL=consultation-medicale.controller.js.map