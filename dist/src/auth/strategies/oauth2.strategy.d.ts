import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
declare const OAuth2Strategy_base: new (...args: any) => any;
export declare class OAuth2Strategy extends OAuth2Strategy_base {
    private configService;
    private authService;
    constructor(configService: ConfigService, authService: AuthService);
    validate(accessToken: string, refreshToken: string, profile: any): Promise<{
        id: any;
        email: any;
        roles: string[];
    }>;
}
export {};
