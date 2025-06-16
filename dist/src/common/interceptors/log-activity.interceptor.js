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
var LogActivityInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogActivityInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const core_1 = require("@nestjs/core");
const log_activity_decorator_1 = require("../decorators/log-activity.decorator");
const journal_activity_service_1 = require("../../journal/journal-activity.service");
let LogActivityInterceptor = LogActivityInterceptor_1 = class LogActivityInterceptor {
    reflector;
    journalActivityService;
    logger = new common_1.Logger(LogActivityInterceptor_1.name);
    constructor(reflector, journalActivityService) {
        this.reflector = reflector;
        this.journalActivityService = journalActivityService;
    }
    intercept(context, next) {
        const shouldLog = this.reflector.getAllAndOverride(log_activity_decorator_1.LOG_ACTIVITY_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        this.logger.debug(`Should log activity: ${shouldLog}`);
        if (!shouldLog) {
            return next.handle();
        }
        const options = this.reflector.getAllAndOverride(log_activity_decorator_1.LOG_ACTIVITY_OPTIONS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        this.logger.debug(`Log activity options: ${JSON.stringify(options)}`);
        if (!options) {
            this.logger.warn('LogActivity decorator used without options');
            return next.handle();
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        this.logger.debug(`Request user: ${JSON.stringify(user)}`);
        if (!user?.utilisateurID) {
            this.logger.debug('No user found in request, skipping activity logging');
            return next.handle();
        }
        return next.handle().pipe((0, operators_1.tap)(async (result) => {
            try {
                const description = typeof options.description === 'function'
                    ? options.description(result)
                    : options.description;
                if (!description) {
                    this.logger.warn('No description provided for activity logging');
                    return;
                }
                await this.journalActivityService.logActivity({
                    utilisateurID: user.utilisateurID,
                    typeAction: options.typeAction,
                    description,
                    ipAdresse: request.ip,
                });
            }
            catch (error) {
                this.logger.error('Error logging activity:', error);
            }
        }));
    }
};
exports.LogActivityInterceptor = LogActivityInterceptor;
exports.LogActivityInterceptor = LogActivityInterceptor = LogActivityInterceptor_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        journal_activity_service_1.JournalActivityService])
], LogActivityInterceptor);
//# sourceMappingURL=log-activity.interceptor.js.map