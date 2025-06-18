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
exports.EtablissementDto = exports.UpdateEtablissementDto = exports.CreateEtablissementDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class CreateEtablissementDto {
    nom;
    adresse;
    telephone;
    email;
    type;
    region;
    description;
    siteWeb;
    estActif = true;
}
exports.CreateEtablissementDto = CreateEtablissementDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom de l\'établissement' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEtablissementDto.prototype, "nom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Adresse de l\'établissement' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEtablissementDto.prototype, "adresse", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Numéro de téléphone de l\'établissement' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEtablissementDto.prototype, "telephone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email de l\'établissement' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateEtablissementDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type d\'établissement', enum: client_1.TypeEtablissement }),
    (0, class_validator_1.IsEnum)(client_1.TypeEtablissement),
    __metadata("design:type", String)
], CreateEtablissementDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Région où se trouve l\'établissement' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEtablissementDto.prototype, "region", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description de l\'établissement', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEtablissementDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site web de l\'établissement', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEtablissementDto.prototype, "siteWeb", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'État d\'activation de l\'établissement', default: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateEtablissementDto.prototype, "estActif", void 0);
class UpdateEtablissementDto {
    nom;
    adresse;
    telephone;
    email;
    type;
    region;
    description;
    siteWeb;
    estActif;
}
exports.UpdateEtablissementDto = UpdateEtablissementDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom de l\'établissement', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEtablissementDto.prototype, "nom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Adresse de l\'établissement', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEtablissementDto.prototype, "adresse", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Numéro de téléphone de l\'établissement', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEtablissementDto.prototype, "telephone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email de l\'établissement', required: false }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEtablissementDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type d\'établissement', required: false }),
    (0, class_validator_1.IsEnum)(client_1.TypeEtablissement),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEtablissementDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Région où se trouve l\'établissement', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEtablissementDto.prototype, "region", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description de l\'établissement', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEtablissementDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site web de l\'établissement', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEtablissementDto.prototype, "siteWeb", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'État d\'activation de l\'établissement', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateEtablissementDto.prototype, "estActif", void 0);
class EtablissementDto {
    etablissementID;
    nom;
    adresse;
    telephone;
    email;
    type;
    region;
    description;
    siteWeb;
    estActif;
    createdAt;
    updatedAt;
}
exports.EtablissementDto = EtablissementDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID unique de l\'établissement' }),
    __metadata("design:type", String)
], EtablissementDto.prototype, "etablissementID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom de l\'établissement' }),
    __metadata("design:type", String)
], EtablissementDto.prototype, "nom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Adresse de l\'établissement' }),
    __metadata("design:type", String)
], EtablissementDto.prototype, "adresse", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Numéro de téléphone de l\'établissement' }),
    __metadata("design:type", String)
], EtablissementDto.prototype, "telephone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email de l\'établissement' }),
    __metadata("design:type", String)
], EtablissementDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type d\'établissement', enum: client_1.TypeEtablissement }),
    __metadata("design:type", String)
], EtablissementDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Région où se trouve l\'établissement' }),
    __metadata("design:type", String)
], EtablissementDto.prototype, "region", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description de l\'établissement' }),
    __metadata("design:type", String)
], EtablissementDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Site web de l\'établissement' }),
    __metadata("design:type", String)
], EtablissementDto.prototype, "siteWeb", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'État d\'activation de l\'établissement' }),
    __metadata("design:type", Boolean)
], EtablissementDto.prototype, "estActif", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date de création' }),
    __metadata("design:type", Date)
], EtablissementDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date de dernière modification' }),
    __metadata("design:type", Date)
], EtablissementDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=etablissement.dto.js.map