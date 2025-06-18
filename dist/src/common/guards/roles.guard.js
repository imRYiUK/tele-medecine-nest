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
var RolesGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let RolesGuard = RolesGuard_1 = class RolesGuard {
    reflector;
    logger = new common_1.Logger(RolesGuard_1.name);
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        try {
            const requiredRoles = this.reflector.get('roles', context.getHandler());
            console.log(requiredRoles);
            if (!requiredRoles) {
                return true;
            }
            const { user } = context.switchToHttp().getRequest();
            if (!user) {
                this.logger.warn('No user found in request');
                throw new common_1.ForbiddenException('User not found in request');
            }
            if (!user.role) {
                this.logger.warn(`User ${user.email} has no role assigned`);
                throw new common_1.ForbiddenException('User has no role assigned');
            }
            const hasRole = requiredRoles.some((role) => user.role === role);
            if (!hasRole) {
                this.logger.warn(`User ${user.email} with role ${user.role} attempted to access resource requiring roles: ${requiredRoles.join(', ')}`);
                throw new common_1.ForbiddenException('Insufficient permissions');
            }
            this.logger.debug(`User ${user.email} with role ${user.role} authorized to access resource`);
            return true;
        }
        catch (error) {
            if (error instanceof common_1.ForbiddenException) {
                throw error;
            }
            this.logger.error(`Error in RolesGuard: ${error.message}`);
            throw new common_1.ForbiddenException('Access denied');
        }
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = RolesGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
//# sourceMappingURL=roles.guard.js.map