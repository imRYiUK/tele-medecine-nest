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
exports.CreatePatientDto = exports.CreateDossierMedicalDto = exports.EtatDossier = exports.Genre = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
var Genre;
(function (Genre) {
    Genre["M"] = "M";
    Genre["F"] = "F";
})(Genre || (exports.Genre = Genre = {}));
var EtatDossier;
(function (EtatDossier) {
    EtatDossier["ACTIF"] = "ACTIF";
    EtatDossier["INACTIF"] = "INACTIF";
    EtatDossier["ARCHIVE"] = "ARCHIVE";
})(EtatDossier || (exports.EtatDossier = EtatDossier = {}));
class CreateDossierMedicalDto {
    etatDossier;
}
exports.CreateDossierMedicalDto = CreateDossierMedicalDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'État du dossier médical', enum: EtatDossier, default: EtatDossier.ACTIF }),
    (0, class_validator_1.IsEnum)(EtatDossier),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDossierMedicalDto.prototype, "etatDossier", void 0);
class CreatePatientDto {
    nom;
    prenom;
    dateNaissance;
    genre;
    adresse;
    telephone;
    email;
    groupeSanguin;
    createdBy;
    dossierMedical;
}
exports.CreatePatientDto = CreatePatientDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom du patient' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "nom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Prénom du patient' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "prenom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date de naissance du patient', example: '1990-01-01' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "dateNaissance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Genre du patient', enum: Genre }),
    (0, class_validator_1.IsEnum)(Genre),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "genre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Adresse du patient' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "adresse", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Numéro de téléphone du patient' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "telephone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email du patient' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Groupe sanguin du patient' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "groupeSanguin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID de l\'utilisateur qui crée le patient' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePatientDto.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Dossier médical du patient', type: CreateDossierMedicalDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreateDossierMedicalDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", CreateDossierMedicalDto)
], CreatePatientDto.prototype, "dossierMedical", void 0);
//# sourceMappingURL=create-patient.dto.js.map