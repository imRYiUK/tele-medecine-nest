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
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = UsersService_1 = class UsersService {
    prisma;
    logger = new common_1.Logger(UsersService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findOne(email) {
        const user = await this.prisma.user.findUnique({
            where: { email },
            include: { roles: true },
        });
        return user;
    }
    async findById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { roles: true },
        });
        return user;
    }
    async validateUser(email, password) {
        const user = await this.findOne(email);
        if (!user) {
            this.logger.warn(`Login attempt for non-existent user: ${email}`);
            return null;
        }
        if (!user.isActive) {
            this.logger.warn(`Login attempt for inactive/locked account: ${email}`);
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    failedLoginAttempts: { increment: 1 },
                    isActive: user.failedLoginAttempts >= 4 ? false : undefined,
                },
            });
            await this.logAuthAttempt(user.id, false, 'Invalid password');
            this.logger.warn(`Failed login attempt for user: ${email}`);
            return null;
        }
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                failedLoginAttempts: 0,
                lastLogin: new Date(),
            },
        });
        await this.logAuthAttempt(user.id, true, 'Login successful');
        this.logger.log(`Successful login for user: ${email}`);
        return user;
    }
    async logAuthAttempt(userId, success, message) {
        try {
            await this.prisma.authLog.create({
                data: {
                    userId,
                    success,
                    message,
                    ipAddress: '127.0.0.1',
                    userAgent: 'API Client',
                },
            });
        }
        catch (error) {
            this.logger.error(`Failed to log auth attempt: ${error.message}`);
        }
    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map