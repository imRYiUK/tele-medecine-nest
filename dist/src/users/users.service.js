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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const journal_activity_service_1 = require("../journal/journal-activity.service");
let UsersService = class UsersService {
    prisma;
    journalActivityService;
    constructor(prisma, journalActivityService) {
        this.prisma = prisma;
        this.journalActivityService = journalActivityService;
    }
    async create(createUserDto, adminId) {
        const existingUser = await this.prisma.utilisateur.findFirst({
            where: {
                OR: [
                    { username: createUserDto.username },
                    { email: createUserDto.email }
                ]
            }
        });
        if (existingUser) {
            throw new common_1.ConflictException('Username or email already exists');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.prisma.utilisateur.create({
            data: {
                ...createUserDto,
                password: hashedPassword,
            },
        });
        await this.journalActivityService.logActivity({
            utilisateurID: adminId,
            typeAction: 'CREATION_UTILISATEUR',
            description: `Création d'un nouvel utilisateur: ${user.nom} ${user.prenom} (${user.username})`,
        });
        const { password, ...result } = user;
        return result;
    }
    async findAll() {
        const users = await this.prisma.utilisateur.findMany();
        return users.map(user => {
            const { password, ...result } = user;
            return result;
        });
    }
    async findOne(utilisateurID) {
        const user = await this.prisma.utilisateur.findUnique({
            where: { utilisateurID },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${utilisateurID} not found`);
        }
        const { password, ...result } = user;
        return result;
    }
    async findById(userId) {
        return this.findOne(userId);
    }
    async update(utilisateurID, updateUserDto, adminId) {
        const existingUser = await this.findOne(utilisateurID);
        if (updateUserDto.username || updateUserDto.email) {
            const conflictingUser = await this.prisma.utilisateur.findFirst({
                where: {
                    AND: [
                        { utilisateurID: { not: utilisateurID } },
                        {
                            OR: [
                                { username: updateUserDto.username },
                                { email: updateUserDto.email }
                            ]
                        }
                    ]
                }
            });
            if (conflictingUser) {
                throw new common_1.ConflictException('Username or email already exists');
            }
        }
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        const updatedUser = await this.prisma.utilisateur.update({
            where: { utilisateurID },
            data: updateUserDto,
        });
        await this.journalActivityService.logActivity({
            utilisateurID: adminId,
            typeAction: 'MODIFICATION_UTILISATEUR',
            description: `Modification des informations de l'utilisateur: ${updatedUser.nom} ${updatedUser.prenom} (${updatedUser.username})`,
        });
        const { password, ...result } = updatedUser;
        return result;
    }
    async remove(utilisateurID, adminId) {
        const user = await this.findOne(utilisateurID);
        await this.prisma.utilisateur.delete({
            where: { utilisateurID },
        });
        await this.journalActivityService.logActivity({
            utilisateurID: adminId,
            typeAction: 'SUPPRESSION_UTILISATEUR',
            description: `Suppression de l'utilisateur: ${user.nom} ${user.prenom} (${user.username})`,
        });
    }
    async getProfile(userId) {
        const user = await this.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return {
            ...user,
            fullName: `${user.prenom} ${user.nom}`,
        };
    }
    async updateProfile(userId, updateUserDto) {
        const { role, estActif, ...safeUpdateData } = updateUserDto;
        const updatedUser = await this.update(userId, safeUpdateData, userId);
        await this.journalActivityService.logActivity({
            utilisateurID: userId,
            typeAction: 'MODIFICATION_PROFIL',
            description: `Modification du profil utilisateur`,
        });
        return updatedUser;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        journal_activity_service_1.JournalActivityService])
], UsersService);
//# sourceMappingURL=users.service.js.map