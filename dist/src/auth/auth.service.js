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
const journal_activity_service_1 = require("../journal/journal-activity.service");
let AuthService = AuthService_1 = class AuthService {
    jwtService;
    configService;
    prisma;
    journalActivityService;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(jwtService, configService, prisma, journalActivityService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.prisma = prisma;
        this.journalActivityService = journalActivityService;
    }
    async validateUser(email, pass) {
        const user = await this.prisma.utilisateur.findUnique({
            where: { email },
        });
        if (!user) {
            this.logger.warn(`Failed login attempt for email: ${email}`);
            throw new common_1.UnauthorizedException('Identifiants invalides ou compte verrouillé');
        }
        const isPasswordValid = await bcrypt.compare(pass, user.password);
        if (!isPasswordValid) {
            return null;
        }
        this.logger.log(`Successful login for user ID: ${user.utilisateurID}`);
        return user;
    }
    async login(loginDto) {
        try {
            const user = await this.prisma.utilisateur.findUnique({
                where: { email: loginDto.email },
            });
            if (!user) {
                this.logger.warn(`Login attempt failed: User not found for email ${loginDto.email}`);
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
            if (!isPasswordValid) {
                this.logger.warn(`Login attempt failed: Invalid password for user ${user.email}`);
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            if (!user.estActif) {
                this.logger.warn(`Login attempt failed: Inactive account ${user.email}`);
                throw new common_1.UnauthorizedException('Account is inactive');
            }
            const payload = {
                sub: user.utilisateurID,
                email: user.email,
                role: user.role,
            };
            this.logger.debug('Generating JWT token with payload:', JSON.stringify(payload, null, 2));
            const token = this.jwtService.sign(payload);
            await this.journalActivityService.logActivity({
                utilisateurID: user.utilisateurID,
                typeAction: 'CONNEXION',
                description: `Connexion réussie: ${user.nom} ${user.prenom} (${user.email})`,
            });
            return {
                access_token: token,
                user: {
                    utilisateurID: user.utilisateurID,
                    email: user.email,
                    nom: user.nom,
                    prenom: user.prenom,
                    role: user.role,
                },
            };
        }
        catch (error) {
            this.logger.error(`Login error: ${error.message}`);
            throw error;
        }
    }
    async revokeToken(token) {
        this.logger.log(`Token revoked: ${token.substring(0, 10)}...`);
        return { success: true };
    }
    async register(registerDto) {
        try {
            const existingUser = await this.prisma.utilisateur.findUnique({
                where: { email: registerDto.email },
            });
            if (existingUser) {
                this.logger.warn(`Registration failed: Email already exists ${registerDto.email}`);
                throw new common_1.UnauthorizedException('Email already exists');
            }
            const hashedPassword = await bcrypt.hash(registerDto.password, 10);
            const user = await this.prisma.utilisateur.create({
                data: {
                    email: registerDto.email,
                    password: hashedPassword,
                    nom: registerDto.nom,
                    prenom: registerDto.prenom,
                    telephone: registerDto.telephone,
                    role: registerDto.role,
                    username: registerDto.email,
                },
            });
            const payload = {
                sub: user.utilisateurID,
                email: user.email,
                role: user.role,
            };
            this.logger.debug('Generating JWT token for new user:', JSON.stringify(payload, null, 2));
            const token = this.jwtService.sign(payload);
            await this.journalActivityService.logActivity({
                utilisateurID: user.utilisateurID,
                typeAction: 'INSCRIPTION',
                description: `Nouvelle inscription: ${user.nom} ${user.prenom} (${user.email})`,
            });
            return {
                access_token: token,
                user: {
                    utilisateurID: user.utilisateurID,
                    email: user.email,
                    nom: user.nom,
                    prenom: user.prenom,
                    role: user.role,
                },
            };
        }
        catch (error) {
            this.logger.error(`Registration error: ${error.message}`);
            throw error;
        }
    }
    async validateToken(token) {
        try {
            const payload = await this.jwtService.verifyAsync(token);
            this.logger.debug('Token validated successfully:', JSON.stringify(payload, null, 2));
            return payload;
        }
        catch (error) {
            this.logger.error(`Token validation error: ${error.message}`);
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        prisma_service_1.PrismaService,
        journal_activity_service_1.JournalActivityService])
], AuthService);
//# sourceMappingURL=auth.service.js.map