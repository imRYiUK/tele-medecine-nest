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
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto, adminId) {
        const { password, ...userData } = createUserDto;
        const existingUser = await this.prisma.utilisateur.findFirst({
            where: {
                OR: [
                    { username: userData.username },
                    { email: userData.email }
                ]
            }
        });
        if (existingUser) {
            throw new common_1.ConflictException('Username or email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.utilisateur.create({
            data: {
                ...userData,
                password: hashedPassword,
            },
        });
        const { password: _, ...result } = user;
        return result;
    }
    async findAll() {
        const users = await this.prisma.utilisateur.findMany({
            select: {
                utilisateurID: true,
                nom: true,
                prenom: true,
                email: true,
                username: true,
                telephone: true,
                role: true,
                estActif: true,
                etablissement: {
                    select: {
                        etablissementID: true,
                        nom: true,
                    },
                },
            },
        });
        return users;
    }
    async findOne(utilisateurID) {
        const user = await this.prisma.utilisateur.findUnique({
            where: { utilisateurID },
            select: {
                utilisateurID: true,
                nom: true,
                prenom: true,
                email: true,
                username: true,
                telephone: true,
                role: true,
                estActif: true,
                etablissement: {
                    select: {
                        etablissementID: true,
                        nom: true,
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${utilisateurID} not found`);
        }
        return user;
    }
    async findById(userId) {
        return this.findOne(userId);
    }
    async update(id, updateUserDto, adminId) {
        const { password, ...updateData } = updateUserDto;
        const existingUser = await this.prisma.utilisateur.findUnique({
            where: { utilisateurID: id },
        });
        if (!existingUser) {
            throw new common_1.NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
        }
        const updatedUser = await this.prisma.utilisateur.update({
            where: { utilisateurID: id },
            data: {
                ...updateData,
                ...(password && { password: await bcrypt.hash(password, 10) }),
            },
            select: {
                utilisateurID: true,
                nom: true,
                prenom: true,
                email: true,
                username: true,
                telephone: true,
                role: true,
                estActif: true,
                etablissement: {
                    select: {
                        etablissementID: true,
                        nom: true,
                    },
                },
            },
        });
        return updatedUser;
    }
    async remove(utilisateurID, adminId) {
        const user = await this.findOne(utilisateurID);
        await this.prisma.utilisateur.delete({
            where: { utilisateurID },
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
        const { password, ...updateData } = updateUserDto;
        const existingUser = await this.prisma.utilisateur.findUnique({
            where: { utilisateurID: userId },
        });
        if (!existingUser) {
            throw new common_1.NotFoundException('Profil utilisateur non trouvé');
        }
        const updatedUser = await this.prisma.utilisateur.update({
            where: { utilisateurID: userId },
            data: {
                ...updateData,
                ...(password && { password: await bcrypt.hash(password, 10) }),
            },
            select: {
                utilisateurID: true,
                nom: true,
                prenom: true,
                email: true,
                username: true,
                telephone: true,
                role: true,
                estActif: true,
                etablissement: {
                    select: {
                        etablissementID: true,
                        nom: true,
                    },
                },
            },
        });
        return updatedUser;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map