import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            utilisateurID: string;
            email: string;
            nom: string;
            prenom: string;
            role: string;
        };
    }>;
}
