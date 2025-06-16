export declare const LOG_ACTIVITY_KEY = "log_activity";
export declare const LOG_ACTIVITY_OPTIONS_KEY = "log_activity_options";
export interface LogActivityOptions {
    typeAction: string;
    description: string | ((result: any) => string);
}
export declare const LogActivity: (options: LogActivityOptions) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
