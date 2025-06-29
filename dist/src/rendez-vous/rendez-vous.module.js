"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RendezVousModule = void 0;
const common_1 = require("@nestjs/common");
const rendez_vous_service_1 = require("./rendez-vous.service");
const rendez_vous_controller_1 = require("./rendez-vous.controller");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_module_1 = require("../notifications/notifications.module");
const users_module_1 = require("../users/users.module");
let RendezVousModule = class RendezVousModule {
};
exports.RendezVousModule = RendezVousModule;
exports.RendezVousModule = RendezVousModule = __decorate([
    (0, common_1.Module)({
        imports: [notifications_module_1.NotificationsModule, users_module_1.UsersModule],
        controllers: [rendez_vous_controller_1.RendezVousController],
        providers: [rendez_vous_service_1.RendezVousService, prisma_service_1.PrismaService],
        exports: [rendez_vous_service_1.RendezVousService],
    })
], RendezVousModule);
//# sourceMappingURL=rendez-vous.module.js.map