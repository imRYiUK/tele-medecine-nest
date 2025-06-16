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
exports.LogActivityInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const core_1 = require("@nestjs/core");
const log_activity_decorator_1 = require("../decorators/log-activity.decorator");
const journal_activity_service_1 = require("../../journal/journal-activity.service");
let LogActivityInterceptor = class LogActivityInterceptor {
    reflector;
    journalActivityService;
    constructor(reflector, journalActivityService) {
        this.reflector = reflector;
        this.journalActivityService = journalActivityService;
    }
    intercept(context, next) {
        const shouldLog = this.reflector.getAllAndOverride(log_activity_decorator_1.LOG_ACTIVITY_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!shouldLog) {
            return next.handle();
        }
        const options = this.reflector.getAllAndOverride(log_activity_decorator_1.LOG_ACTIVITY_OPTIONS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user || !user.utilisateurID) {
            return next.handle();
        }
        return next.handle().pipe((0, operators_1.tap)(async (result) => {
            try {
                const description = typeof options.description === 'function'
                    ? options.description(result)
                    : options.description;
                await this.journalActivityService.logActivity({
                    utilisateurID: user.utilisateurID,
                    typeAction: options.typeAction,
                    description,
                    ipAdresse: request.ip,
                });
            }
            catch (error) {
                console.error('Error logging activity:', error);
            }
        }));
    }
};
exports.LogActivityInterceptor = LogActivityInterceptor;
exports.LogActivityInterceptor = LogActivityInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        journal_activity_service_1.JournalActivityService])
], LogActivityInterceptor);
//# sourceMappingURL=log-activity.interceptor.js.map