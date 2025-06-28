import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        user: {
            utilisateurID: string;
            nom: string;
            prenom: string;
            username: string;
            email: string;
            telephone: string;
            role: string;
            etablissementID: string | null;
            estActif: boolean;
        };
        token: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        user: {
            utilisateurID: string;
            nom: string;
            prenom: string;
            username: string;
            email: string;
            telephone: string;
            role: string;
            etablissementID: string | null;
            estActif: boolean;
        };
        token: string;
    }>;
}
