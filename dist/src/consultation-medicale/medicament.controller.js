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
exports.MedicamentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const medicament_service_1 = require("./medicament.service");
const medicament_dto_1 = require("./dto/medicament.dto");
let MedicamentController = class MedicamentController {
    medicamentService;
    constructor(medicamentService) {
        this.medicamentService = medicamentService;
    }
    async findAll() {
        return this.medicamentService.findAll();
    }
    async searchByName(searchTerm) {
        return this.medicamentService.searchByName(searchTerm);
    }
    async searchByNameStartsWith(searchTerm) {
        return this.medicamentService.searchByNameStartsWith(searchTerm);
    }
    async getRandomMedicaments(limit) {
        const limitNumber = limit ? parseInt(limit, 10) : 10;
        return this.medicamentService.getRandomMedicaments(limitNumber);
    }
    async findOne(medicamentID) {
        return this.medicamentService.findOne(medicamentID);
    }
};
exports.MedicamentController = MedicamentController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all medications' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all medications', type: [medicament_dto_1.MedicamentDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MedicamentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search medications by name' }),
    (0, swagger_1.ApiQuery)({ name: 'q', description: 'Search term' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of matching medications', type: [medicament_dto_1.MedicamentDto] }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MedicamentController.prototype, "searchByName", null);
__decorate([
    (0, common_1.Get)('autocomplete'),
    (0, swagger_1.ApiOperation)({ summary: 'Get medications for autocomplete (starts with)' }),
    (0, swagger_1.ApiQuery)({ name: 'q', description: 'Search term' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of medications for autocomplete', type: [medicament_dto_1.MedicamentDto] }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MedicamentController.prototype, "searchByNameStartsWith", null);
__decorate([
    (0, common_1.Get)('random'),
    (0, swagger_1.ApiOperation)({ summary: 'Get random medications' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', description: 'Number of medications to return', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of random medications', type: [medicament_dto_1.MedicamentDto] }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MedicamentController.prototype, "getRandomMedicaments", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific medication by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Medication details', type: medicament_dto_1.MedicamentDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Medication not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MedicamentController.prototype, "findOne", null);
exports.MedicamentController = MedicamentController = __decorate([
    (0, swagger_1.ApiTags)('medicaments'),
    (0, common_1.Controller)('medicaments'),
    __metadata("design:paramtypes", [medicament_service_1.MedicamentService])
], MedicamentController);
//# sourceMappingURL=medicament.controller.js.map