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
    
    this.logger.log(`Successful login for user ID: ${user.userId}`);
    return user;
  }

  async login(user: User) {
    const payload = {
      sub: user.userId,
      email: user.email,
      role: user.role?.name, // Accéder au nom du rôle via la relation
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '24h', // Définir une durée fixe de 24 heures
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
    // Comme la table RevokedToken a été supprimée, nous pourrions implémenter
    // une autre solution comme Redis pour stocker les tokens révoqués
    // Pour l'instant, nous allons simplement logger la révocation
    this.logger.log(`Token revoked: ${token.substring(0, 10)}...`);
    return { success: true };
  }

  async register(email: string, password: string, roleId: number) {
    const user = await this.usersService.register(email, password, roleId);
    
    return this.login(user);
  }
}
