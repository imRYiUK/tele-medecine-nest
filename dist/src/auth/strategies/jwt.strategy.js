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
var JwtStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../prisma/prisma.service");
let JwtStrategy = JwtStrategy_1 = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    configService;
    prisma;
    logger = new common_1.Logger(JwtStrategy_1.name);
    constructor(configService, prisma) {
        const secret = configService.get('JWT_SECRET');
        if (!secret) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret,
        });
        this.configService = configService;
        this.prisma = prisma;
    }
    async validate(payload) {
        try {
            if (!payload.sub) {
                this.logger.error('JWT payload missing sub claim');
                throw new common_1.UnauthorizedException('Invalid token structure');
            }
            const user = await this.prisma.utilisateur.findUnique({
                where: { utilisateurID: payload.sub },
            });
            if (!user) {
                this.logger.warn(`User not found for ID: ${payload.sub}`);
                throw new common_1.UnauthorizedException('User not found');
            }
            if (!user.estActif) {
                this.logger.warn(`Inactive user attempted to authenticate: ${user.email}`);
                throw new common_1.UnauthorizedException('Account is inactive');
            }
            return {
                utilisateurID: user.utilisateurID,
                email: user.email,
                role: user.role,
                nom: user.nom,
                prenom: user.prenom,
                estActif: user.estActif
            };
        }
        catch (error) {
            this.logger.error(`JWT validation error: ${error.message}`);
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = JwtStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map