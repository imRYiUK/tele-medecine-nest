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
var JwtAuthGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const core_1 = require("@nestjs/core");
const public_decorator_1 = require("../decorators/public.decorator");
let JwtAuthGuard = JwtAuthGuard_1 = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    reflector;
    logger = new common_1.Logger(JwtAuthGuard_1.name);
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    canActivate(context) {
        try {
            const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);
            if (isPublic) {
                this.logger.debug('Public route, skipping authentication');
                return true;
            }
            this.logger.debug('Protected route, proceeding with JWT validation');
            return super.canActivate(context);
        }
        catch (error) {
            this.logger.error(`Authentication error: ${error.message}`);
            throw new common_1.UnauthorizedException('Authentication failed');
        }
    }
    handleRequest(err, user, info) {
        this.logger.debug('JWT Guard handleRequest called with:', {
            error: err ? err.message : 'no error',
            user: user ? 'user present' : 'no user',
            info: info ? JSON.stringify(info) : 'no info'
        });
        if (err) {
            this.logger.error(`JWT validation error: ${err.message}`);
            throw new common_1.UnauthorizedException('Authentication failed');
        }
        if (!user) {
            this.logger.warn('No user found in JWT token. Info:', info);
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
        if (!user.utilisateurID) {
            this.logger.error('Invalid user object structure:', JSON.stringify(user, null, 2));
            throw new common_1.UnauthorizedException('Invalid user object structure');
        }
        this.logger.debug('User authenticated successfully:', {
            utilisateurID: user.utilisateurID,
            email: user.email,
            role: user.role
        });
        return user;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = JwtAuthGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map