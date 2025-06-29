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
exports.RendezVousController = void 0;
const common_1 = require("@nestjs/common");
const rendez_vous_service_1 = require("./rendez-vous.service");
const update_rendez_vous_dto_1 = require("./dto/update-rendez-vous.dto");
const log_activity_decorator_1 = require("../common/decorators/log-activity.decorator");
let RendezVousController = class RendezVousController {
    rendezVousService;
    constructor(rendezVousService) {
        this.rendezVousService = rendezVousService;
    }
    async create(body, req) {
        return this.rendezVousService.create({ ...body, createdByID: req.user.utilisateurID });
    }
    async findAll() {
        return this.rendezVousService.findAll();
    }
    async findByMedecin(medecinID) {
        return this.rendezVousService.findByMedecin(medecinID);
    }
    async findByRadiologue(radiologueID) {
        return this.rendezVousService.findByMedecin(radiologueID);
    }
    async findByPatient(patientID) {
        return this.rendezVousService.findByPatient(patientID);
    }
    async update(id, body) {
        return this.rendezVousService.update(id, body);
    }
    async remove(id) {
        return this.rendezVousService.remove(id);
    }
};
exports.RendezVousController = RendezVousController;
__decorate([
    (0, common_1.Post)(),
    (0, log_activity_decorator_1.LogActivity)({
        typeAction: 'RENDEZVOUS_CREATE',
        description: (result) => `Création d'un rendez-vous (ID: ${result?.rendezVousID || result?.id || 'N/A'})`
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RendezVousController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RendezVousController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('medecin/:medecinID'),
    __param(0, (0, common_1.Param)('medecinID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RendezVousController.prototype, "findByMedecin", null);
__decorate([
    (0, common_1.Get)('radiologue/:radiologueID'),
    __param(0, (0, common_1.Param)('radiologueID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RendezVousController.prototype, "findByRadiologue", null);
__decorate([
    (0, common_1.Get)('patient/:patientID'),
    __param(0, (0, common_1.Param)('patientID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RendezVousController.prototype, "findByPatient", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, log_activity_decorator_1.LogActivity)({
        typeAction: 'RENDEZVOUS_UPDATE',
        description: (result) => `Modification du rendez-vous (ID: ${result?.rendezVousID || result?.id || 'N/A'})`
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_rendez_vous_dto_1.UpdateRendezVousDto]),
    __metadata("design:returntype", Promise)
], RendezVousController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, log_activity_decorator_1.LogActivity)({
        typeAction: 'RENDEZVOUS_DELETE',
        description: (result) => `Suppression du rendez-vous (ID: ${result?.rendezVousID || result?.id || 'N/A'})`
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RendezVousController.prototype, "remove", null);
exports.RendezVousController = RendezVousController = __decorate([
    (0, common_1.Controller)('rendez-vous'),
    __metadata("design:paramtypes", [rendez_vous_service_1.RendezVousService])
], RendezVousController);
//# sourceMappingURL=rendez-vous.controller.js.map