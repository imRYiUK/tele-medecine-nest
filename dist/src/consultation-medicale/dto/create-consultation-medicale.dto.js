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
exports.CreateConsultationMedicaleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreatePrescriptionDto {
    medicamentID;
    posologie;
    duree;
    instructions;
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du médicament' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreatePrescriptionDto.prototype, "medicamentID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Posologie' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePrescriptionDto.prototype, "posologie", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Durée du traitement' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePrescriptionDto.prototype, "duree", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Instructions pour la prise du médicament' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePrescriptionDto.prototype, "instructions", void 0);
class CreateOrdonnanceDto {
    prescriptions;
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Liste des prescriptions' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreatePrescriptionDto),
    __metadata("design:type", Array)
], CreateOrdonnanceDto.prototype, "prescriptions", void 0);
class CreateConsultationMedicaleDto {
    dossierID;
    patientID;
    dateConsultation;
    motif;
    diagnostics;
    observations;
    traitementPrescrit;
    estTelemedicine;
    lienVisio;
    ordonnance;
}
exports.CreateConsultationMedicaleDto = CreateConsultationMedicaleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du dossier médical' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateConsultationMedicaleDto.prototype, "dossierID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du patient' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateConsultationMedicaleDto.prototype, "patientID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date de la consultation' }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateConsultationMedicaleDto.prototype, "dateConsultation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Motif de la consultation' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConsultationMedicaleDto.prototype, "motif", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Diagnostics établis' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConsultationMedicaleDto.prototype, "diagnostics", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Observations médicales' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConsultationMedicaleDto.prototype, "observations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Traitement prescrit' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateConsultationMedicaleDto.prototype, "traitementPrescrit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indique si la consultation est en télémédecine' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateConsultationMedicaleDto.prototype, "estTelemedicine", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lien de la visioconférence (optionnel)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateConsultationMedicaleDto.prototype, "lienVisio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ordonnance associée à la consultation', type: CreateOrdonnanceDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateOrdonnanceDto),
    __metadata("design:type", CreateOrdonnanceDto)
], CreateConsultationMedicaleDto.prototype, "ordonnance", void 0);
//# sourceMappingURL=create-consultation-medicale.dto.js.map