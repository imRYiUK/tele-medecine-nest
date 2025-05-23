import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private usersService;
    private jwtService;
    private configService;
    private readonly logger;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    validateUser(email: string, password: string): Promise<User>;
    login(user: User): Promise<{
        access_token: string;
    }>;
    validateToken(token: string): Promise<any>;
    revokeToken(token: string): Promise<{
        success: boolean;
    }>;
    register(email: string, password: string, roles: string[]): Promise<{
        access_token: string;
    }>;
}
