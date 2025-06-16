import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserDto } from '../common/dto/user.dto';
import { JournalActivityService } from '../journal/journal-activity.service';
import { JwtPayload } from '../common/interfaces/jwt-payload.interface';
export declare class AuthService {
    private jwtService;
    private configService;
    private prisma;
    private journalActivityService;
    private readonly logger;
    constructor(jwtService: JwtService, configService: ConfigService, prisma: PrismaService, journalActivityService: JournalActivityService);
    validateUser(email: string, pass: string): Promise<UserDto | null>;
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
    revokeToken(token: string): Promise<{
        success: boolean;
    }>;
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            utilisateurID: string;
            email: string;
            nom: string;
            prenom: string;
            role: string;
        };
    }>;
    validateToken(token: string): Promise<JwtPayload>;
}
