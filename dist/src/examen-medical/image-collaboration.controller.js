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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageCollaborationController = void 0;
const common_1 = require("@nestjs/common");
const image_collaboration_service_1 = require("./image-collaboration.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const chat_message_dto_1 = require("./dto/chat-message.dto");
let ImageCollaborationController = class ImageCollaborationController {
    collaborationService;
    constructor(collaborationService) {
        this.collaborationService = collaborationService;
    }
    async invite(imageID, inviteeID, req) {
        return this.collaborationService.inviteRadiologistToImage(imageID, req.user.utilisateurID, inviteeID);
    }
    async collaborators(imageID) {
        return this.collaborationService.listCollaborators(imageID);
    }
    async sendMessage(imageID, createMessageDto, req) {
        return this.collaborationService.sendMessage(imageID, req.user.utilisateurID, createMessageDto.content);
    }
    async getMessages(imageID) {
        return this.collaborationService.getMessages(imageID);
    }
    async getUserCollaborations(req) {
        return this.collaborationService.getUserCollaborations(req.user.utilisateurID);
    }
    async getPendingCollaborations(req) {
        return this.collaborationService.getPendingCollaborations(req.user.utilisateurID);
    }
};
exports.ImageCollaborationController = ImageCollaborationController;
__decorate([
    (0, common_1.Post)(':imageID/invite'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE"),
    (0, swagger_1.ApiOperation)({ summary: 'Inviter un radiologue à collaborer sur une image' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Invitation envoyée avec succès' }),
    __param(0, (0, common_1.Param)('imageID')),
    __param(1, (0, common_1.Body)('inviteeID')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ImageCollaborationController.prototype, "invite", null);
__decorate([
    (0, common_1.Get)(':imageID/collaborators'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE"),
    (0, swagger_1.ApiOperation)({ summary: 'Lister les collaborateurs d\'une image' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des collaborateurs récupérée' }),
    __param(0, (0, common_1.Param)('imageID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ImageCollaborationController.prototype, "collaborators", null);
__decorate([
    (0, common_1.Post)(':imageID/messages'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE"),
    (0, swagger_1.ApiOperation)({ summary: 'Envoyer un message sur une image' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Message envoyé avec succès', type: chat_message_dto_1.ChatMessageDto }),
    __param(0, (0, common_1.Param)('imageID')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, chat_message_dto_1.CreateChatMessageDto, Object]),
    __metadata("design:returntype", Promise)
], ImageCollaborationController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Get)(':imageID/messages'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE"),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer les messages d\'une image' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Messages récupérés avec succès', type: [chat_message_dto_1.ChatMessageDto] }),
    __param(0, (0, common_1.Param)('imageID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ImageCollaborationController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Get)('user/collaborations'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE"),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer les collaborations d\'un utilisateur' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Collaborations récupérées avec succès' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImageCollaborationController.prototype, "getUserCollaborations", null);
__decorate([
    (0, common_1.Get)('user/pending-collaborations'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE"),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer les collaborations en attente d\'un utilisateur' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Collaborations en attente récupérées' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImageCollaborationController.prototype, "getPendingCollaborations", null);
exports.ImageCollaborationController = ImageCollaborationController = __decorate([
    (0, common_1.Controller)('examen-medical/images'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiTags)('Image Collaboration'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [image_collaboration_service_1.ImageCollaborationService])
], ImageCollaborationController);
//# sourceMappingURL=image-collaboration.controller.js.map