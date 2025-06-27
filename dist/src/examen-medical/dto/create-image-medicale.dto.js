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
exports.CreateImageMedicaleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateImageMedicaleDto {
    examenID;
    studyInstanceUID;
    seriesInstanceUID;
    sopInstanceUID;
    dateAcquisition;
    modalite;
    description;
    url;
    orthancInstanceId;
}
exports.CreateImageMedicaleDto = CreateImageMedicaleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID de l\'examen médical auquel cette image appartient' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateImageMedicaleDto.prototype, "examenID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'UID de l\'étude DICOM' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateImageMedicaleDto.prototype, "studyInstanceUID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'UID de la série DICOM' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateImageMedicaleDto.prototype, "seriesInstanceUID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'UID de l\'instance DICOM' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateImageMedicaleDto.prototype, "sopInstanceUID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date d\'acquisition de l\'image (format: YYYY-MM-DD ou ISO 8601)' }),
    (0, class_validator_1.IsDateString)({ strict: false }),
    __metadata("design:type", String)
], CreateImageMedicaleDto.prototype, "dateAcquisition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Modalité d\'imagerie (ex: CT, MRI, X-Ray, Ultrasound)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateImageMedicaleDto.prototype, "modalite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description détaillée de l\'image et de la zone examinée' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateImageMedicaleDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'URL d\'accès à l\'image (WADO, preview, etc.)', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateImageMedicaleDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID de l\'instance Orthanc pour l\'accès aux previews', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateImageMedicaleDto.prototype, "orthancInstanceId", void 0);
//# sourceMappingURL=create-image-medicale.dto.js.map