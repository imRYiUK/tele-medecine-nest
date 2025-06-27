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
exports.RendezVousDto = exports.MedecinInfoDto = exports.PatientInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PatientInfoDto {
    patientID;
    nom;
    prenom;
    constructor(entity) {
        this.patientID = entity.patientID;
        this.nom = entity.nom;
        this.prenom = entity.prenom;
    }
}
exports.PatientInfoDto = PatientInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PatientInfoDto.prototype, "patientID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PatientInfoDto.prototype, "nom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PatientInfoDto.prototype, "prenom", void 0);
class MedecinInfoDto {
    utilisateurID;
    nom;
    prenom;
    constructor(entity) {
        this.utilisateurID = entity.utilisateurID;
        this.nom = entity.nom;
        this.prenom = entity.prenom;
    }
}
exports.MedecinInfoDto = MedecinInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MedecinInfoDto.prototype, "utilisateurID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MedecinInfoDto.prototype, "nom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MedecinInfoDto.prototype, "prenom", void 0);
class RendezVousDto {
    rendezVousID;
    date;
    debutTime;
    endTime;
    motif;
    patient;
    medecin;
    constructor(entity) {
        this.rendezVousID = entity.rendezVousID;
        if (entity.date && entity.debutTime && entity.endTime) {
            this.date = entity.date;
            this.debutTime = entity.debutTime;
            this.endTime = entity.endTime;
        }
        else if (entity.dateHeure) {
            const dateObj = entity.dateHeure instanceof Date ? entity.dateHeure : new Date(entity.dateHeure);
            this.date = dateObj.toISOString().slice(0, 10);
            this.debutTime = dateObj.toISOString().slice(11, 16);
            this.endTime = entity.endTime || this.debutTime;
        }
        else {
            this.date = '';
            this.debutTime = '';
            this.endTime = '';
        }
        this.motif = entity.motif;
        this.patient = entity.patient
            ? new PatientInfoDto(entity.patient)
            : undefined;
        this.medecin = entity.medecin
            ? new MedecinInfoDto(entity.medecin)
            : undefined;
    }
}
exports.RendezVousDto = RendezVousDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RendezVousDto.prototype, "rendezVousID", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RendezVousDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RendezVousDto.prototype, "debutTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RendezVousDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RendezVousDto.prototype, "motif", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => PatientInfoDto, required: false }),
    __metadata("design:type", PatientInfoDto)
], RendezVousDto.prototype, "patient", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => MedecinInfoDto, required: false }),
    __metadata("design:type", MedecinInfoDto)
], RendezVousDto.prototype, "medecin", void 0);
//# sourceMappingURL=rendez-vous.dto.js.map