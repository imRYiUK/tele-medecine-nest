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
exports.OAuth2Strategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_oauth2_1 = require("passport-oauth2");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("../auth.service");
let OAuth2Strategy = class OAuth2Strategy extends (0, passport_1.PassportStrategy)(passport_oauth2_1.Strategy, 'oauth2') {
    configService;
    authService;
    constructor(configService, authService) {
        super({
            authorizationURL: configService.get('OAUTH2_AUTH_URL', 'https://auth-provider.example.com/oauth2/authorize'),
            tokenURL: configService.get('OAUTH2_TOKEN_URL', 'https://auth-provider.example.com/oauth2/token'),
            clientID: configService.get('OAUTH2_CLIENT_ID', 'demo-client-id'),
            clientSecret: configService.get('OAUTH2_CLIENT_SECRET', 'demo-client-secret'),
            callbackURL: configService.get('OAUTH2_CALLBACK_URL', 'https://your-app.example.com/auth/callback'),
            scope: ['profile', 'email'],
        });
        this.configService = configService;
        this.authService = authService;
    }
    async validate(accessToken, refreshToken, profile) {
        return {
            id: profile.id || 999,
            email: profile.email || 'oauth-user@example.com',
            roles: ['user'],
        };
    }
};
exports.OAuth2Strategy = OAuth2Strategy;
exports.OAuth2Strategy = OAuth2Strategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        auth_service_1.AuthService])
], OAuth2Strategy);
//# sourceMappingURL=oauth2.strategy.js.map