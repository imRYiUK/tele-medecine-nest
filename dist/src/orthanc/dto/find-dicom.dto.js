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
exports.FindDicomDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class FindDicomDto {
    Level;
    Query;
}
exports.FindDicomDto = FindDicomDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ['Patient', 'Study', 'Series', 'Instance'],
        description: 'Niveau de recherche DICOM',
        example: 'Study',
    }),
    (0, class_validator_1.IsEnum)(['Patient', 'Study', 'Series', 'Instance']),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FindDicomDto.prototype, "Level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Critères de recherche DICOM',
        example: {
            PatientID: '*',
            StudyDate: '20250101-20251231',
            ModalitiesInStudy: 'CT',
        },
        additionalProperties: true,
    }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], FindDicomDto.prototype, "Query", void 0);
//# sourceMappingURL=find-dicom.dto.js.map