import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { UserDto } from '../common/dto/user.dto';
export declare class AuthService {
    private jwtService;
    private configService;
    private prisma;
    private readonly logger;
    constructor(jwtService: JwtService, configService: ConfigService, prisma: PrismaService);
    validateUser(email: string, pass: string): Promise<UserDto | null>;
    login(user: UserDto): Promise<{
        access_token: string;
    }>;
    validateToken(token: string): Promise<any>;
    revokeToken(token: string): Promise<{
        success: boolean;
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
    comparePasswords(passwordIn: string, passwordBD: string): Promise<boolean>;
}
