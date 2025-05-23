import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.validateUser(email, password);
    
    if (!user) {
      this.logger.warn(`Failed login attempt for email: ${email}`);
      throw new UnauthorizedException('Identifiants invalides ou compte verrouillé');
    }
    
    this.logger.log(`Successful login for user ID: ${user.id}`);
    return user;
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRATION'),
    });

    return {
      access_token: accessToken,
    };
  }

  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      
      return {
        active: true,
        ...payload,
      };
    } catch (error) {
      return {
        active: false,
        error: error.message,
      };
    }
  }

  async revokeToken(token: string) {
    // In a real application, you would add the token to a blacklist
    // or use Redis to store revoked tokens until they expire
    this.logger.log(`Token revoked: ${token.substring(0, 10)}...`);
    return { success: true };
  }
}
