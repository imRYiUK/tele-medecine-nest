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
var UsersController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const user_dto_1 = require("../common/dto/user.dto");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const roles_1 = require("../common/constants/roles");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const log_activity_decorator_1 = require("../common/decorators/log-activity.decorator");
const public_decorator_1 = require("../common/decorators/public.decorator");
let UsersController = UsersController_1 = class UsersController {
    usersService;
    logger = new common_1.Logger(UsersController_1.name);
    constructor(usersService) {
        this.usersService = usersService;
    }
    getUserId(req) {
        if (!req.user || !req.user['utilisateurID']) {
            throw new common_1.UnauthorizedException('Utilisateur non authentifié');
        }
        return req.user['utilisateurID'];
    }
    getUserRole(req) {
        if (!req.user || !req.user['role']) {
            throw new common_1.UnauthorizedException('Rôle utilisateur non défini');
        }
        return req.user['role'];
    }
    validateRoleHierarchy(requesterRole, targetRole) {
        if (requesterRole === roles_1.UserRole.SUPER_ADMIN) {
            return true;
        }
        if (requesterRole === roles_1.UserRole.ADMINISTRATEUR && targetRole !== roles_1.UserRole.SUPER_ADMIN) {
            return true;
        }
        return false;
    }
    async create(createUserDto, req) {
        const requesterRole = this.getUserRole(req);
        if (!this.validateRoleHierarchy(requesterRole, createUserDto.role)) {
            throw new common_1.ForbiddenException('Vous n\'avez pas les permissions nécessaires pour créer cet utilisateur');
        }
        const adminId = this.getUserId(req);
        return this.usersService.create(createUserDto, adminId);
    }
    async findAll(req) {
        const requesterRole = this.getUserRole(req);
        return this.usersService.findAll(requesterRole);
    }
    async searchUsers(query, req) {
        this.logger.log(`Search request - query: ${query}, user: ${req.user?.['utilisateurID']}`);
        const requesterRole = this.getUserRole(req);
        this.logger.log(`Requester role: ${requesterRole}`);
        if (!query) {
            this.logger.log('Empty query, returning empty array');
            return [];
        }
        const results = await this.usersService.searchUsers(query, requesterRole);
        if (results === null) {
            this.logger.log('No results found (null)');
            return [];
        }
        if (Array.isArray(results)) {
            this.logger.log(`Search results count: ${results.length}`);
            return results;
        }
        else {
            this.logger.log('Search result: single user');
            return results;
        }
    }
    async testSearchUsers(query) {
        this.logger.log(`Test search request - query: ${query}`);
        if (!query) {
            this.logger.log('Empty query, returning empty array');
            return [];
        }
        const results = await this.usersService.searchUsers(query);
        if (results === null) {
            this.logger.log('No results found (null)');
            return [];
        }
        if (Array.isArray(results)) {
            this.logger.log(`Test search results count: ${results.length}`);
            return results;
        }
        else {
            this.logger.log('Test search result: single user');
            return results;
        }
    }
    async findOne(id, req) {
        const requesterRole = this.getUserRole(req);
        const user = await this.usersService.findOne(id);
        if (!this.validateRoleHierarchy(requesterRole, user.role)) {
            throw new common_1.ForbiddenException('Vous n\'avez pas les permissions nécessaires pour consulter cet utilisateur');
        }
        return user;
    }
    async update(id, updateUserDto, req) {
        const requesterRole = this.getUserRole(req);
        const user = await this.usersService.findOne(id);
        if (!this.validateRoleHierarchy(requesterRole, user.role)) {
            throw new common_1.ForbiddenException('Vous n\'avez pas les permissions nécessaires pour modifier cet utilisateur');
        }
        if (updateUserDto.role && !this.validateRoleHierarchy(requesterRole, updateUserDto.role)) {
            throw new common_1.ForbiddenException('Vous n\'avez pas les permissions nécessaires pour attribuer ce rôle');
        }
        const adminId = this.getUserId(req);
        return this.usersService.update(id, updateUserDto, adminId);
    }
    async remove(id, req) {
        const requesterRole = this.getUserRole(req);
        const user = await this.usersService.findOne(id);
        if (!this.validateRoleHierarchy(requesterRole, user.role)) {
            throw new common_1.ForbiddenException('Vous n\'avez pas les permissions nécessaires pour supprimer cet utilisateur');
        }
        const adminId = this.getUserId(req);
        return this.usersService.remove(id, adminId);
    }
    async getProfile(req) {
        const userId = this.getUserId(req);
        return this.usersService.getProfile(userId);
    }
    async updateProfile(req, updateUserDto) {
        const userId = this.getUserId(req);
        return this.usersService.updateProfile(userId, updateUserDto);
    }
    async findMedecinsByEtablissement(etablissementID) {
        return this.usersService.findMedecinsByEtablissement(etablissementID);
    }
    async findRadiologuesByEtablissement(etablissementID) {
        return this.usersService.findRadiologuesByEtablissement(etablissementID);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(roles_1.UserRole.SUPER_ADMIN, roles_1.UserRole.ADMINISTRATEUR),
    (0, log_activity_decorator_1.LogActivity)({
        typeAction: 'CREATION_UTILISATEUR',
        description: (result) => `Création d'un nouvel utilisateur: ${result.email}`,
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User created successfully', type: user_dto_1.UserDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Username or email already exists' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(roles_1.UserRole.SUPER_ADMIN, roles_1.UserRole.ADMINISTRATEUR),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns all users', type: [user_dto_1.UserDto] }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, roles_decorator_1.Roles)(roles_1.UserRole.SUPER_ADMIN, roles_1.UserRole.ADMINISTRATEUR, roles_1.UserRole.RADIOLOGUE),
    (0, swagger_1.ApiOperation)({ summary: 'Search users by email, name, or username' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns matching users', type: [user_dto_1.UserDto] }),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "searchUsers", null);
__decorate([
    (0, common_1.Get)('search/test'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Test search users by email, name, or username (public)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns matching users', type: [user_dto_1.UserDto] }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "testSearchUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(roles_1.UserRole.SUPER_ADMIN, roles_1.UserRole.ADMINISTRATEUR),
    (0, swagger_1.ApiOperation)({ summary: 'Get a user by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the user', type: user_dto_1.UserDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(roles_1.UserRole.SUPER_ADMIN, roles_1.UserRole.ADMINISTRATEUR),
    (0, log_activity_decorator_1.LogActivity)({
        typeAction: 'MODIFICATION_UTILISATEUR',
        description: (result) => `Modification de l'utilisateur: ${result.email}`,
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Update a user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User updated successfully', type: user_dto_1.UserDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Username or email already exists' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(roles_1.UserRole.SUPER_ADMIN, roles_1.UserRole.ADMINISTRATEUR),
    (0, log_activity_decorator_1.LogActivity)({
        typeAction: 'SUPPRESSION_UTILISATEUR',
        description: (result) => `Suppression de l'utilisateur: ${result.email}`,
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('profile/me'),
    (0, roles_decorator_1.Roles)(roles_1.UserRole.SUPER_ADMIN, roles_1.UserRole.ADMINISTRATEUR, roles_1.UserRole.RADIOLOGUE, roles_1.UserRole.MEDECIN, roles_1.UserRole.RECEPTIONNISTE),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user profile' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the current user profile',
        type: user_dto_1.UserDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - User not found or token invalid'
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('profile/me'),
    (0, roles_decorator_1.Roles)(roles_1.UserRole.SUPER_ADMIN, roles_1.UserRole.ADMINISTRATEUR, roles_1.UserRole.RADIOLOGUE, roles_1.UserRole.MEDECIN, roles_1.UserRole.RECEPTIONNISTE),
    (0, log_activity_decorator_1.LogActivity)({
        typeAction: 'MODIFICATION_PROFIL',
        description: 'Modification du profil utilisateur',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Update current user profile' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Profile updated successfully',
        type: user_dto_1.UserDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized - User not found or token invalid'
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('medecins/etablissement/:etablissementID'),
    (0, roles_decorator_1.Roles)(roles_1.UserRole.SUPER_ADMIN, roles_1.UserRole.ADMINISTRATEUR, roles_1.UserRole.RECEPTIONNISTE),
    (0, swagger_1.ApiOperation)({ summary: 'Get all medecins for a given etablissement' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns all medecins for the etablissement', type: [user_dto_1.UserDto] }),
    __param(0, (0, common_1.Param)('etablissementID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findMedecinsByEtablissement", null);
__decorate([
    (0, common_1.Get)('radiologues/etablissement/:etablissementID'),
    (0, roles_decorator_1.Roles)(roles_1.UserRole.SUPER_ADMIN, roles_1.UserRole.ADMINISTRATEUR, roles_1.UserRole.RECEPTIONNISTE),
    (0, swagger_1.ApiOperation)({ summary: 'Get all radiologues for a given etablissement' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns all radiologues for the etablissement', type: [user_dto_1.UserDto] }),
    __param(0, (0, common_1.Param)('etablissementID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findRadiologuesByEtablissement", null);
exports.UsersController = UsersController = UsersController_1 = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map