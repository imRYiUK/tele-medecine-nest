"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogActivity = exports.LOG_ACTIVITY_OPTIONS_KEY = exports.LOG_ACTIVITY_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.LOG_ACTIVITY_KEY = 'log_activity';
exports.LOG_ACTIVITY_OPTIONS_KEY = 'log_activity_options';
const LogActivity = (options) => {
    return (target, propertyKey, descriptor) => {
        (0, common_1.SetMetadata)(exports.LOG_ACTIVITY_KEY, true)(target, propertyKey, descriptor);
        (0, common_1.SetMetadata)(exports.LOG_ACTIVITY_OPTIONS_KEY, options)(target, propertyKey, descriptor);
        return descriptor;
    };
};
exports.LogActivity = LogActivity;
//# sourceMappingURL=log-activity.decorator.js.map