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
exports.ExamenMedicalListDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ExamenMedicalListDto {
    examenID;
    dateExamen;
    description;
    estAnalyse;
    patientNom;
    patientPrenom;
    typeExamenNom;
    typeExamenCategorie;
    demandeParNom;
    demandeParPrenom;
    nombreImages;
    nombreRadiologues;
}
exports.ExamenMedicalListDto = ExamenMedicalListDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Identifiant unique de l\'examen médical' }),
    __metadata("design:type", String)
], ExamenMedicalListDto.prototype, "examenID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date de l\'examen' }),
    __metadata("design:type", Date)
], ExamenMedicalListDto.prototype, "dateExamen", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description de l\'examen' }),
    __metadata("design:type", String)
], ExamenMedicalListDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indique si l\'examen a été analysé' }),
    __metadata("design:type", Boolean)
], ExamenMedicalListDto.prototype, "estAnalyse", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom du patient' }),
    __metadata("design:type", String)
], ExamenMedicalListDto.prototype, "patientNom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Prénom du patient' }),
    __metadata("design:type", String)
], ExamenMedicalListDto.prototype, "patientPrenom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type d\'examen' }),
    __metadata("design:type", String)
], ExamenMedicalListDto.prototype, "typeExamenNom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Catégorie de l\'examen' }),
    __metadata("design:type", String)
], ExamenMedicalListDto.prototype, "typeExamenCategorie", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom du médecin qui a demandé l\'examen' }),
    __metadata("design:type", String)
], ExamenMedicalListDto.prototype, "demandeParNom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Prénom du médecin qui a demandé l\'examen' }),
    __metadata("design:type", String)
], ExamenMedicalListDto.prototype, "demandeParPrenom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre d\'images associées à cet examen' }),
    __metadata("design:type", Number)
], ExamenMedicalListDto.prototype, "nombreImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre de radiologues assignés à cet examen' }),
    __metadata("design:type", Number)
], ExamenMedicalListDto.prototype, "nombreRadiologues", void 0);
//# sourceMappingURL=examen-medical-list.dto.js.map