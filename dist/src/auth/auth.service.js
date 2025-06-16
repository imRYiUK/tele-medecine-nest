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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let AuthService = AuthService_1 = class AuthService {
    jwtService;
    configService;
    prisma;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(jwtService, configService, prisma) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.prisma = prisma;
    }
    async validateUser(email, pass) {
        const user = await this.prisma.utilisateur.findUnique({
            where: { email },
        });
        if (!user) {
            this.logger.warn(`Failed login attempt for email: ${email}`);
            throw new common_1.UnauthorizedException('Identifiants invalides ou compte verrouillé');
        }
        const isPasswordValid = await this.comparePasswords(pass, user.password);
        if (!isPasswordValid) {
            return null;
        }
        this.logger.log(`Successful login for user ID: ${user.utilisateurID}`);
        return user;
    }
    async login(user) {
        const payload = {
            sub: user.utilisateurID,
            email: user.email,
            role: user.role,
        };
        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: '24h',
        });
        return {
            access_token: accessToken,
        };
    }
    async validateToken(token) {
        try {
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_SECRET'),
            });
            return {
                active: true,
                ...payload,
            };
        }
        catch (error) {
            return {
                active: false,
                error: error.message,
            };
        }
    }
    async revokeToken(token) {
        this.logger.log(`Token revoked: ${token.substring(0, 10)}...`);
        return { success: true };
    }
    async register(registerDto) {
        try {
            const existingUsername = await this.prisma.utilisateur.findUnique({
                where: { username: registerDto.username },
            });
            if (existingUsername) {
                throw new common_1.ConflictException('Ce nom d\'utilisateur est déjà utilisé');
            }
            const existingEmail = await this.prisma.utilisateur.findUnique({
                where: { email: registerDto.email },
            });
            if (existingEmail) {
                throw new common_1.ConflictException('Cet email est déjà utilisé');
            }
            const hashedPassword = await bcrypt.hash(registerDto.password, 10);
            const user = await this.prisma.utilisateur.create({
                data: {
                    nom: registerDto.nom,
                    prenom: registerDto.prenom,
                    username: registerDto.username,
                    password: hashedPassword,
                    email: registerDto.email,
                    telephone: registerDto.telephone,
                    role: registerDto.role,
                    etablissementID: registerDto.etablissementID,
                    estActif: registerDto.estActif,
                },
                select: {
                    utilisateurID: true,
                    nom: true,
                    prenom: true,
                    username: true,
                    email: true,
                    telephone: true,
                    role: true,
                    etablissementID: true,
                    estActif: true,
                },
            });
            return {
                message: 'Utilisateur créé avec succès',
                user,
            };
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.BadRequestException('Erreur lors de la création de l\'utilisateur');
        }
    }
    async comparePasswords(passwordIn, passwordBD) {
        return await bcrypt.compare(passwordIn, passwordBD);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map