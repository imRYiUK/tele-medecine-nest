import { SetMetadata } from '@nestjs/common';

export const LOG_ACTIVITY_KEY = 'log_activity';
export const LOG_ACTIVITY_OPTIONS_KEY = 'log_activity_options';

export interface LogActivityOptions {
  typeAction: string;
  description: string | ((result: any) => string);
}

export const LogActivity = (options: LogActivityOptions) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    SetMetadata(LOG_ACTIVITY_KEY, true)(target, propertyKey, descriptor);
    SetMetadata(LOG_ACTIVITY_OPTIONS_KEY, options)(target, propertyKey, descriptor);
    return descriptor;
  };
}; 