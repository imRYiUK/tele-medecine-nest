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
exports.EtablissementsController = void 0;
const common_1 = require("@nestjs/common");
const etablissements_service_1 = require("./etablissements.service");
const etablissement_dto_1 = require("./dto/etablissement.dto");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_1 = require("../common/constants/roles");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const log_activity_decorator_1 = require("../common/decorators/log-activity.decorator");
const client_1 = require("@prisma/client");
let EtablissementsController = class EtablissementsController {
    etablissementsService;
    constructor(etablissementsService) {
        this.etablissementsService = etablissementsService;
    }
    async create(createEtablissementDto) {
        return this.etablissementsService.create(createEtablissementDto);
    }
    async findAll() {
        return this.etablissementsService.findAll();
    }
    async findByRegion(region) {
        return this.etablissementsService.findByRegion(region);
    }
    async findByType(type) {
        return this.etablissementsService.findByType(type);
    }
    async findOne(id) {
        return this.etablissementsService.findOne(id);
    }
    async update(id, updateEtablissementDto) {
        return this.etablissementsService.update(id, updateEtablissementDto);
    }
    async remove(id) {
        return this.etablissementsService.remove(id);
    }
};
exports.EtablissementsController = EtablissementsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(roles_1.UserRole.SUPER_ADMIN),
    (0, log_activity_decorator_1.LogActivity)({
        typeAction: 'CREATION_ETABLISSEMENT',
        description: (result) => `Création d'un nouvel établissement: ${result.nom}`,
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new establishment' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Establishment created successfully', type: etablissement_dto_1.EtablissementDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Email or phone number already exists' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [etablissement_dto_1.CreateEtablissementDto]),
    __metadata("design:returntype", Promise)
], EtablissementsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(roles_1.UserRole.SUPER_ADMIN, roles_1.UserRole.ADMINISTRATEUR),
    (0, swagger_1.ApiOperation)({ summary: 'Get all establishments' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns all establishments', type: [etablissement_dto_1.EtablissementDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EtablissementsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('region/:region'),
    (0, roles_decorator_1.Roles)(roles_1.UserRole.SUPER_ADMIN, roles_1.UserRole.ADMINISTRATEUR),
    (0, swagger_1.ApiOperation)({ summary: 'Get establishments by region' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns establishments in the specified region', type: [etablissement_dto_1.EtablissementDto] }),
    __param(0, (0, common_1.Param)('region')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EtablissementsController.prototype, "findByRegion", null);
__decorate([
    (0, common_1.Get)('type/:type'),
    (0, roles_decorator_1.Roles)(roles_1.UserRole.SUPER_ADMIN, roles_1.UserRole.ADMINISTRATEUR),
    (0, swagger_1.ApiOperation)({ summary: 'Get establishments by type' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns establishments of the specified type', type: [etablissement_dto_1.EtablissementDto] }),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EtablissementsController.prototype, "findByType", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(roles_1.UserRole.SUPER_ADMIN, roles_1.UserRole.ADMINISTRATEUR),
    (0, swagger_1.ApiOperation)({ summary: 'Get an establishment by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the establishment', type: etablissement_dto_1.EtablissementDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Establishment not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EtablissementsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(roles_1.UserRole.SUPER_ADMIN),
    (0, log_activity_decorator_1.LogActivity)({
        typeAction: 'MODIFICATION_ETABLISSEMENT',
        description: (result) => `Modification de l'établissement: ${result.nom}`,
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Update an establishment' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Establishment updated successfully', type: etablissement_dto_1.EtablissementDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Establishment not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Email or phone number already exists' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, etablissement_dto_1.UpdateEtablissementDto]),
    __metadata("design:returntype", Promise)
], EtablissementsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(roles_1.UserRole.SUPER_ADMIN),
    (0, log_activity_decorator_1.LogActivity)({
        typeAction: 'SUPPRESSION_ETABLISSEMENT',
        description: (result) => `Suppression de l'établissement: ${result.nom}`,
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an establishment' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Establishment deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Establishment not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Cannot delete establishment with associated users' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EtablissementsController.prototype, "remove", null);
exports.EtablissementsController = EtablissementsController = __decorate([
    (0, swagger_1.ApiTags)('etablissements'),
    (0, common_1.Controller)('etablissements'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [etablissements_service_1.EtablissementsService])
], EtablissementsController);
//# sourceMappingURL=etablissements.controller.js.map