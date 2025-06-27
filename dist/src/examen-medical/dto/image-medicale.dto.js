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
exports.ImageMedicaleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ImageMedicaleDto {
    imageID;
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
exports.ImageMedicaleDto = ImageMedicaleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Identifiant unique de l\'image médicale' }),
    __metadata("design:type", String)
], ImageMedicaleDto.prototype, "imageID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID de l\'examen médical auquel cette image appartient' }),
    __metadata("design:type", String)
], ImageMedicaleDto.prototype, "examenID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'UID de l\'étude DICOM' }),
    __metadata("design:type", String)
], ImageMedicaleDto.prototype, "studyInstanceUID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'UID de la série DICOM' }),
    __metadata("design:type", String)
], ImageMedicaleDto.prototype, "seriesInstanceUID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'UID de l\'instance DICOM' }),
    __metadata("design:type", String)
], ImageMedicaleDto.prototype, "sopInstanceUID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date d\'acquisition de l\'image' }),
    __metadata("design:type", Date)
], ImageMedicaleDto.prototype, "dateAcquisition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Modalité d\'imagerie (ex: CT, MRI, X-Ray, Ultrasound)' }),
    __metadata("design:type", String)
], ImageMedicaleDto.prototype, "modalite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description détaillée de l\'image et de la zone examinée' }),
    __metadata("design:type", String)
], ImageMedicaleDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'URL d\'accès à l\'image (WADO, preview, etc.)', required: false }),
    __metadata("design:type", Object)
], ImageMedicaleDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID de l\'instance Orthanc pour l\'accès aux previews', required: false }),
    __metadata("design:type", Object)
], ImageMedicaleDto.prototype, "orthancInstanceId", void 0);
//# sourceMappingURL=image-medicale.dto.js.map