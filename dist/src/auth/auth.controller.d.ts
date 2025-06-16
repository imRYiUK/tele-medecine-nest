import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
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
        token: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
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
        token: string;
    }>;
}
