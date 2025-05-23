import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
    authorize(clientId: string, redirectUri: string, responseType: string, scope: string, state: string): {
        code: string;
        state: string;
    };
    token(grantType: string, code: string, clientId: string, clientSecret: string, redirectUri: string): Promise<{
        access_token: string;
    }>;
    introspect(token: string): Promise<any>;
    revoke(token: string): Promise<{
        success: boolean;
    }>;
    getProfile(req: Request): Express.User | undefined;
}
