"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrthancModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const orthanc_service_1 = require("./orthanc.service");
const orthanc_controller_1 = require("./orthanc.controller");
const collaborative_orthanc_service_1 = require("./collaborative-orthanc.service");
const collaborative_orthanc_controller_1 = require("./collaborative-orthanc.controller");
const prisma_module_1 = require("../prisma/prisma.module");
const journal_module_1 = require("../journal/journal.module");
let OrthancModule = class OrthancModule {
};
exports.OrthancModule = OrthancModule;
exports.OrthancModule = OrthancModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            config_1.ConfigModule,
            prisma_module_1.PrismaModule,
            journal_module_1.JournalModule,
        ],
        controllers: [orthanc_controller_1.OrthancController, collaborative_orthanc_controller_1.CollaborativeOrthancController],
        providers: [orthanc_service_1.OrthancService, collaborative_orthanc_service_1.CollaborativeOrthancService],
        exports: [orthanc_service_1.OrthancService, collaborative_orthanc_service_1.CollaborativeOrthancService],
    })
], OrthancModule);
//# sourceMappingURL=orthanc.module.js.map