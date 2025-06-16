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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateExamenMedicalDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateExamenMedicalDto {
    dossierID;
    patientID;
    typeExamenID;
    dateExamen;
    description;
    resultat;
    estAnalyse;
}
exports.CreateExamenMedicalDto = CreateExamenMedicalDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du dossier médical' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateExamenMedicalDto.prototype, "dossierID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du patient' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateExamenMedicalDto.prototype, "patientID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du type d\'examen' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateExamenMedicalDto.prototype, "typeExamenID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date de l\'examen' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateExamenMedicalDto.prototype, "dateExamen", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description de l\'examen' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExamenMedicalDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Résultat de l\'examen (optionnel)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateExamenMedicalDto.prototype, "resultat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'État de l\'analyse' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateExamenMedicalDto.prototype, "estAnalyse", void 0);
//# sourceMappingURL=create-examen-medical.dto.js.map