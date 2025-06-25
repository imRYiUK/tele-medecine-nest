"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamenMedicalModule = void 0;
const common_1 = require("@nestjs/common");
const examen_medical_service_1 = require("./examen-medical.service");
const examen_medical_controller_1 = require("./examen-medical.controller");
const notifications_module_1 = require("../notifications/notifications.module");
const image_collaboration_controller_1 = require("./image-collaboration.controller");
const image_collaboration_service_1 = require("./image-collaboration.service");
let ExamenMedicalModule = class ExamenMedicalModule {
};
exports.ExamenMedicalModule = ExamenMedicalModule;
exports.ExamenMedicalModule = ExamenMedicalModule = __decorate([
    (0, common_1.Module)({
        imports: [notifications_module_1.NotificationsModule],
        controllers: [examen_medical_controller_1.ExamenMedicalController, image_collaboration_controller_1.ImageCollaborationController],
        providers: [examen_medical_service_1.ExamenMedicalService, image_collaboration_service_1.ImageCollaborationService],
        exports: [examen_medical_service_1.ExamenMedicalService]
    })
], ExamenMedicalModule);
//# sourceMappingURL=examen-medical.module.js.map