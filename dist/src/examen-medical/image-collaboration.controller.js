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
var ImageCollaborationController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageCollaborationController = void 0;
const common_1 = require("@nestjs/common");
const image_collaboration_service_1 = require("./image-collaboration.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const chat_message_dto_1 = require("./dto/chat-message.dto");
let ImageCollaborationController = ImageCollaborationController_1 = class ImageCollaborationController {
    collaborationService;
    logger = new common_1.Logger(ImageCollaborationController_1.name);
    constructor(collaborationService) {
        this.collaborationService = collaborationService;
    }
    async getReceivedInvitations(req) {
        return this.collaborationService.getPendingCollaborations(req.user.utilisateurID);
    }
    async getSentInvitations(req) {
        return this.collaborationService.getSentInvitations(req.user.utilisateurID);
    }
    async getActiveCollaborations(req) {
        return this.collaborationService.getUserCollaborations(req.user.utilisateurID);
    }
    async inviteRadiologistToImage(imageID, inviteeID, req) {
        this.logger.log(`Invite request - imageID: ${imageID}, inviteeID: ${inviteeID}, inviterID: ${req.user?.utilisateurID}`);
        const result = await this.collaborationService.inviteRadiologistToImage(imageID, req.user.utilisateurID, inviteeID);
        this.logger.log(`Invite request completed successfully`);
        return result;
    }
    async inviteRadiologistToImageBySopInstanceUID(sopInstanceUID, inviteeID, req) {
        this.logger.log(`SOP Invite request - sopInstanceUID: ${sopInstanceUID}, inviteeID: ${inviteeID}, inviterID: ${req.user?.utilisateurID}`);
        const image = await this.collaborationService.findImageBySopInstanceUID(sopInstanceUID);
        this.logger.log(`Found image by SOP Instance UID - imageID: ${image.imageID}`);
        const result = await this.collaborationService.inviteRadiologistToImage(image.imageID, req.user.utilisateurID, inviteeID);
        this.logger.log(`SOP Invite request completed successfully`);
        return result;
    }
    async acceptCollaborationInvitation(collaborationId, req) {
        return this.collaborationService.acceptCollaboration(collaborationId, req.user.utilisateurID);
    }
    async rejectCollaborationInvitation(collaborationId, req) {
        return this.collaborationService.rejectCollaboration(collaborationId, req.user.utilisateurID);
    }
    async getImageCollaborators(imageID) {
        return this.collaborationService.listCollaborators(imageID);
    }
    async getImageCollaboratorsBySopInstanceUID(sopInstanceUID) {
        this.logger.log(`SOP Collaborators request - sopInstanceUID: ${sopInstanceUID}`);
        const image = await this.collaborationService.findImageBySopInstanceUID(sopInstanceUID);
        this.logger.log(`Found image by SOP Instance UID - imageID: ${image.imageID}`);
        const result = await this.collaborationService.listCollaborators(image.imageID);
        this.logger.log(`SOP Collaborators request completed successfully`);
        return result;
    }
    async getPendingCollaborationsBySopInstanceUID(sopInstanceUID) {
        this.logger.log(`SOP Pending Collaborations request - sopInstanceUID: ${sopInstanceUID}`);
        const image = await this.collaborationService.findImageBySopInstanceUID(sopInstanceUID);
        this.logger.log(`Found image by SOP Instance UID - imageID: ${image.imageID}`);
        const result = await this.collaborationService.getAllPendingCollaborationsForImage(image.imageID);
        this.logger.log(`SOP Pending Collaborations request completed successfully`);
        return result;
    }
    async sendMessageOnImage(imageID, createMessageDto, req) {
        return this.collaborationService.sendMessage(imageID, req.user.utilisateurID, createMessageDto.content);
    }
    async getImageMessages(imageID) {
        return this.collaborationService.getMessages(imageID);
    }
};
exports.ImageCollaborationController = ImageCollaborationController;
__decorate([
    (0, common_1.Get)('user/received-invitations'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE"),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer toutes les invitations reçues par l\'utilisateur (Invitee)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Invitations reçues récupérées' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImageCollaborationController.prototype, "getReceivedInvitations", null);
__decorate([
    (0, common_1.Get)('user/sent-invitations'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE"),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer toutes les invitations envoyées par l\'utilisateur (Inviter)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Invitations envoyées récupérées' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImageCollaborationController.prototype, "getSentInvitations", null);
__decorate([
    (0, common_1.Get)('user/active-collaborations'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE"),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer toutes les collaborations actives de l\'utilisateur' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Collaborations actives récupérées' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImageCollaborationController.prototype, "getActiveCollaborations", null);
__decorate([
    (0, common_1.Post)(':imageID/invite'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE"),
    (0, swagger_1.ApiOperation)({ summary: 'Inviter un radiologue à collaborer sur une image (Inviter)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Invitation envoyée avec succès' }),
    __param(0, (0, common_1.Param)('imageID')),
    __param(1, (0, common_1.Body)('inviteeID')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ImageCollaborationController.prototype, "inviteRadiologistToImage", null);
__decorate([
    (0, common_1.Post)('sop/:sopInstanceUID/invite'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE"),
    (0, swagger_1.ApiOperation)({ summary: 'Inviter un radiologue à collaborer sur une image par SOP Instance UID (Inviter)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Invitation envoyée avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Image not found' }),
    __param(0, (0, common_1.Param)('sopInstanceUID')),
    __param(1, (0, common_1.Body)('inviteeID')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ImageCollaborationController.prototype, "inviteRadiologistToImageBySopInstanceUID", null);
__decorate([
    (0, common_1.Post)('collaborations/:collaborationId/accept'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE"),
    (0, swagger_1.ApiOperation)({ summary: 'Accepter une invitation de collaboration (Invitee)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Invitation acceptée avec succès' }),
    __param(0, (0, common_1.Param)('collaborationId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ImageCollaborationController.prototype, "acceptCollaborationInvitation", null);
__decorate([
    (0, common_1.Post)('collaborations/:collaborationId/reject'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE"),
    (0, swagger_1.ApiOperation)({ summary: 'Rejeter une invitation de collaboration (Invitee)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Invitation rejetée avec succès' }),
    __param(0, (0, common_1.Param)('collaborationId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ImageCollaborationController.prototype, "rejectCollaborationInvitation", null);
__decorate([
    (0, common_1.Get)(':imageID/collaborators'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE"),
    (0, swagger_1.ApiOperation)({ summary: 'Lister les collaborateurs d\'une image' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des collaborateurs récupérée' }),
    __param(0, (0, common_1.Param)('imageID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ImageCollaborationController.prototype, "getImageCollaborators", null);
__decorate([
    (0, common_1.Get)('sop/:sopInstanceUID/collaborators'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE"),
    (0, swagger_1.ApiOperation)({ summary: 'Lister les collaborateurs d\'une image par SOP Instance UID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des collaborateurs récupérée' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Image not found' }),
    __param(0, (0, common_1.Param)('sopInstanceUID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ImageCollaborationController.prototype, "getImageCollaboratorsBySopInstanceUID", null);
__decorate([
    (0, common_1.Get)('sop/:sopInstanceUID/pending-collaborations'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE"),
    (0, swagger_1.ApiOperation)({ summary: 'Lister les collaborations en attente d\'une image par SOP Instance UID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Liste des collaborations en attente récupérée' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Image not found' }),
    __param(0, (0, common_1.Param)('sopInstanceUID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ImageCollaborationController.prototype, "getPendingCollaborationsBySopInstanceUID", null);
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
], ImageCollaborationController.prototype, "sendMessageOnImage", null);
__decorate([
    (0, common_1.Get)(':imageID/messages'),
    (0, roles_decorator_1.Roles)("RADIOLOGUE"),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer les messages d\'une image' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Messages récupérés avec succès', type: [chat_message_dto_1.ChatMessageDto] }),
    __param(0, (0, common_1.Param)('imageID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ImageCollaborationController.prototype, "getImageMessages", null);
exports.ImageCollaborationController = ImageCollaborationController = ImageCollaborationController_1 = __decorate([
    (0, common_1.Controller)('examen-medical/images'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiTags)('Image Collaboration'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [image_collaboration_service_1.ImageCollaborationService])
], ImageCollaborationController);
//# sourceMappingURL=image-collaboration.controller.js.map