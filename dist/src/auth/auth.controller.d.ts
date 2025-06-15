import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        message: string;
        user: {
            etablissementID: string | null;
            nom: string;
            telephone: string;
            email: string;
            utilisateurID: string;
            prenom: string;
            username: string;
            role: string;
            estActif: boolean;
        };
    }>;
    getProfile(req: Request): Express.User | undefined;
}
