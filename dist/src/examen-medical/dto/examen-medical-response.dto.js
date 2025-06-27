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
exports.ExamenMedicalResponseDto = exports.RadiologueDto = exports.DemandeParDto = exports.TypeExamenDto = exports.PatientInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const image_medicale_dto_1 = require("./image-medicale.dto");
class PatientInfoDto {
    nom;
    prenom;
    dateNaissance;
}
exports.PatientInfoDto = PatientInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom du patient' }),
    __metadata("design:type", String)
], PatientInfoDto.prototype, "nom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Prénom du patient' }),
    __metadata("design:type", String)
], PatientInfoDto.prototype, "prenom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date de naissance du patient' }),
    __metadata("design:type", Date)
], PatientInfoDto.prototype, "dateNaissance", void 0);
class TypeExamenDto {
    typeExamenID;
    nomType;
    description;
    categorie;
}
exports.TypeExamenDto = TypeExamenDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du type d\'examen' }),
    __metadata("design:type", String)
], TypeExamenDto.prototype, "typeExamenID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom du type d\'examen' }),
    __metadata("design:type", String)
], TypeExamenDto.prototype, "nomType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description du type d\'examen' }),
    __metadata("design:type", String)
], TypeExamenDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Catégorie de l\'examen' }),
    __metadata("design:type", String)
], TypeExamenDto.prototype, "categorie", void 0);
class DemandeParDto {
    nom;
    prenom;
    role;
}
exports.DemandeParDto = DemandeParDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom du médecin qui a demandé l\'examen' }),
    __metadata("design:type", String)
], DemandeParDto.prototype, "nom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Prénom du médecin qui a demandé l\'examen' }),
    __metadata("design:type", String)
], DemandeParDto.prototype, "prenom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Rôle du médecin' }),
    __metadata("design:type", String)
], DemandeParDto.prototype, "role", void 0);
class RadiologueDto {
    utilisateurID;
    nom;
    prenom;
    email;
}
exports.RadiologueDto = RadiologueDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du radiologue' }),
    __metadata("design:type", String)
], RadiologueDto.prototype, "utilisateurID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom du radiologue' }),
    __metadata("design:type", String)
], RadiologueDto.prototype, "nom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Prénom du radiologue' }),
    __metadata("design:type", String)
], RadiologueDto.prototype, "prenom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email du radiologue' }),
    __metadata("design:type", String)
], RadiologueDto.prototype, "email", void 0);
class ExamenMedicalResponseDto {
    examenID;
    dossierID;
    patientID;
    dateExamen;
    description;
    resultat;
    estAnalyse;
    consultationID;
    patient;
    typeExamen;
    demandePar;
    images;
    radiologues;
}
exports.ExamenMedicalResponseDto = ExamenMedicalResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Identifiant unique de l\'examen médical' }),
    __metadata("design:type", String)
], ExamenMedicalResponseDto.prototype, "examenID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du dossier médical' }),
    __metadata("design:type", String)
], ExamenMedicalResponseDto.prototype, "dossierID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du patient' }),
    __metadata("design:type", String)
], ExamenMedicalResponseDto.prototype, "patientID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date de l\'examen' }),
    __metadata("design:type", Date)
], ExamenMedicalResponseDto.prototype, "dateExamen", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description de l\'examen' }),
    __metadata("design:type", String)
], ExamenMedicalResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Résultat de l\'examen (si analysé)', required: false }),
    __metadata("design:type", String)
], ExamenMedicalResponseDto.prototype, "resultat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indique si l\'examen a été analysé' }),
    __metadata("design:type", Boolean)
], ExamenMedicalResponseDto.prototype, "estAnalyse", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID de la consultation associée (si applicable)', required: false }),
    __metadata("design:type", String)
], ExamenMedicalResponseDto.prototype, "consultationID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Informations du patient' }),
    __metadata("design:type", PatientInfoDto)
], ExamenMedicalResponseDto.prototype, "patient", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type d\'examen' }),
    __metadata("design:type", TypeExamenDto)
], ExamenMedicalResponseDto.prototype, "typeExamen", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Médecin qui a demandé l\'examen' }),
    __metadata("design:type", DemandeParDto)
], ExamenMedicalResponseDto.prototype, "demandePar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Images médicales associées à cet examen', type: [image_medicale_dto_1.ImageMedicaleDto] }),
    __metadata("design:type", Array)
], ExamenMedicalResponseDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Radiologues assignés à cet examen', type: [RadiologueDto] }),
    __metadata("design:type", Array)
], ExamenMedicalResponseDto.prototype, "radiologues", void 0);
//# sourceMappingURL=examen-medical-response.dto.js.map