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
exports.JournalController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const journal_service_1 = require("./journal.service");
let JournalController = class JournalController {
    journalService;
    constructor(journalService) {
        this.journalService = journalService;
    }
    async findAll(req) {
        return this.journalService.findAll(req.user.utilisateurID, req.user.role);
    }
    async findByUser(utilisateurID, req) {
        return this.journalService.findByUser(utilisateurID, req.user.utilisateurID, req.user.role);
    }
    async findByDateRange(startDate, endDate, req) {
        return this.journalService.findByDateRange(new Date(startDate), new Date(endDate), req.user.utilisateurID, req.user.role);
    }
    async findByTypeAction(typeAction, req) {
        return this.journalService.findByTypeAction(typeAction, req.user.utilisateurID, req.user.role);
    }
};
exports.JournalController = JournalController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)("SUPER_ADMIN", "ADMINISTRATEUR"),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer tout l\'historique des actions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des actions récupérée avec succès' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JournalController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('user'),
    (0, roles_decorator_1.Roles)("SUPER_ADMIN", "ADMINISTRATEUR"),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer l\'historique des actions d\'un utilisateur' }),
    (0, swagger_1.ApiQuery)({ name: 'utilisateurID', required: true, type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des actions de l\'utilisateur récupérée avec succès' }),
    __param(0, (0, common_1.Query)('utilisateurID')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], JournalController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)('date-range'),
    (0, roles_decorator_1.Roles)("SUPER_ADMIN", "ADMINISTRATEUR"),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer l\'historique des actions sur une période donnée' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: true, type: Date }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: true, type: Date }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des actions sur la période récupérée avec succès' }),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], JournalController.prototype, "findByDateRange", null);
__decorate([
    (0, common_1.Get)('type'),
    (0, roles_decorator_1.Roles)("SUPER_ADMIN", "ADMINISTRATEUR"),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer l\'historique des actions par type' }),
    (0, swagger_1.ApiQuery)({ name: 'typeAction', required: true, type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des actions du type spécifié récupérée avec succès' }),
    __param(0, (0, common_1.Query)('typeAction')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], JournalController.prototype, "findByTypeAction", null);
exports.JournalController = JournalController = __decorate([
    (0, common_1.Controller)('journal'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiTags)('Journal d\'activité'),
    __metadata("design:paramtypes", [journal_service_1.JournalService])
], JournalController);
//# sourceMappingURL=journal.controller.js.map