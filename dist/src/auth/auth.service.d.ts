import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    private configService;
    private prisma;
    private readonly logger;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService, prisma: PrismaService);
    validateUser(email: string, password: string): Promise<User>;
    login(user: User): Promise<{
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
}
