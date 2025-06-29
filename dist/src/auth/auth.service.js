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
        const { email, password } = loginDto;
        const user = await this.prisma.utilisateur.findFirst({
            where: {
                OR: [
                    { email },
                    { email: email },
                ],
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Identifiants invalides');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Identifiants invalides');
        }
        if (!user.estActif) {
            throw new common_1.UnauthorizedException('Compte désactivé');
        }
        const payload = {
            sub: user.utilisateurID,
            email: user.email,
            role: user.role,
            etaId: user.etablissementID || null
        };
        const token = this.jwtService.sign(payload);
        const { password: _, ...result } = user;
        return {
            user: result,
            token,
        };
    }
    async revokeToken(token) {
        this.logger.log(`Token revoked: ${token.substring(0, 10)}...`);
        return { success: true };
    }
    async register(registerDto) {
        const { password, ...userData } = registerDto;
        const existingUser = await this.prisma.utilisateur.findFirst({
            where: {
                OR: [
                    { email: userData.email },
                    { username: userData.username },
                ],
            },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Un utilisateur avec cet email ou ce nom d\'utilisateur existe déjà');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.utilisateur.create({
            data: {
                ...userData,
                password: hashedPassword,
            },
        });
        const payload = {
            sub: user.utilisateurID,
            email: user.email,
            role: user.role,
            etaId: user.etablissementID || null
        };
        const token = this.jwtService.sign(payload);
        const { password: _, ...result } = user;
        return {
            user: result,
            token,
        };
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