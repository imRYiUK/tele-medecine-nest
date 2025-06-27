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
    (0, swagger_1.ApiProperty)({
        description: 'ID du dossier médical auquel l\'examen appartient',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsUUID)('4', { message: 'dossierID doit être un UUID valide' }),
    __metadata("design:type", String)
], CreateExamenMedicalDto.prototype, "dossierID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID du patient qui subit l\'examen',
        example: '123e4567-e89b-12d3-a456-426614174001'
    }),
    (0, class_validator_1.IsUUID)('4', { message: 'patientID doit être un UUID valide' }),
    __metadata("design:type", String)
], CreateExamenMedicalDto.prototype, "patientID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID du type d\'examen (ex: radiographie, échographie, etc.)',
        example: '123e4567-e89b-12d3-a456-426614174002'
    }),
    (0, class_validator_1.IsUUID)('4', { message: 'typeExamenID doit être un UUID valide' }),
    __metadata("design:type", String)
], CreateExamenMedicalDto.prototype, "typeExamenID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date prévue ou effectuée de l\'examen (format ISO: YYYY-MM-DDTHH:mm:ss.sssZ)',
        example: '2024-01-15T10:30:00.000Z'
    }),
    (0, class_validator_1.IsDateString)({}, { message: 'dateExamen doit être une date valide au format ISO' }),
    __metadata("design:type", String)
], CreateExamenMedicalDto.prototype, "dateExamen", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description détaillée de l\'examen et des instructions',
        example: 'Radiographie du thorax pour suspicion de pneumonie'
    }),
    (0, class_validator_1.IsString)({ message: 'description doit être une chaîne de caractères' }),
    __metadata("design:type", String)
], CreateExamenMedicalDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Résultat de l\'examen (rempli après analyse)',
        required: false,
        example: 'Pneumonie confirmée dans le lobe inférieur droit'
    }),
    (0, class_validator_1.IsString)({ message: 'resultat doit être une chaîne de caractères' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateExamenMedicalDto.prototype, "resultat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indique si l\'examen a été analysé par un radiologue',
        required: false,
        default: false,
        example: false
    }),
    (0, class_validator_1.IsBoolean)({ message: 'estAnalyse doit être un booléen' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateExamenMedicalDto.prototype, "estAnalyse", void 0);
//# sourceMappingURL=create-examen-medical.dto.js.map