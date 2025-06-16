import { BadRequestException, ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../common/dto/user.dto';
import { JournalActivityService } from '../journal/journal-activity.service';
import { JwtPayload } from '../common/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private prisma: PrismaService,
    private journalActivityService: JournalActivityService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserDto | null> {
    // const user = await this.usersService.validateUser(email, password);

    const user = await this.prisma.utilisateur.findUnique({
      where: { email },
    });

    if (!user) {
      this.logger.warn(`Failed login attempt for email: ${email}`);
      throw new UnauthorizedException('Identifiants invalides ou compte verrouillé');
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      return null;
    }

    this.logger.log(`Successful login for user ID: ${user.utilisateurID}`);
    return user;
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.prisma.utilisateur.findUnique({
        where: { email: loginDto.email },
      });

      if (!user) {
        this.logger.warn(`Login attempt failed: User not found for email ${loginDto.email}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
      if (!isPasswordValid) {
        this.logger.warn(`Login attempt failed: Invalid password for user ${user.email}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      if (!user.estActif) {
        this.logger.warn(`Login attempt failed: Inactive account ${user.email}`);
        throw new UnauthorizedException('Account is inactive');
      }

      const payload: JwtPayload = {
        sub: user.utilisateurID,
        email: user.email,
        role: user.role,
      };

      const token = this.jwtService.sign(payload);
      
      await this.journalActivityService.logActivity({
        utilisateurID: user.utilisateurID,
        typeAction: 'CONNEXION',
        description: `Connexion réussie: ${user.nom} ${user.prenom} (${user.email})`,
      });

      return {
        access_token: token,
        user: {
          utilisateurID: user.utilisateurID,
          email: user.email,
          nom: user.nom,
          prenom: user.prenom,
          role: user.role,
        },
      };
    } catch (error) {
      this.logger.error(`Login error: ${error.message}`);
      throw error;
    }
  }

  async revokeToken(token: string) {
    // Comme la table RevokedToken a été supprimée, nous pourrions implémenter
    // une autre solution comme Redis pour stocker les tokens révoqués
    // Pour l'instant, nous allons simplement logger la révocation
    this.logger.log(`Token revoked: ${token.substring(0, 10)}...`);
    return { success: true };
  }

  async register(registerDto: RegisterDto) {
    try {
      const existingUser = await this.prisma.utilisateur.findUnique({
        where: { email: registerDto.email },
      });

      if (existingUser) {
        this.logger.warn(`Registration failed: Email already exists ${registerDto.email}`);
        throw new UnauthorizedException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      const user = await this.prisma.utilisateur.create({
        data: {
          email: registerDto.email,
          password: hashedPassword,
          nom: registerDto.nom,
          prenom: registerDto.prenom,
          telephone: registerDto.telephone,
          role: registerDto.role,
          username: registerDto.email,
        },
      });

      const payload: JwtPayload = {
        sub: user.utilisateurID,
        email: user.email,
        role: user.role,
      };

      const token = this.jwtService.sign(payload);

      await this.journalActivityService.logActivity({
        utilisateurID: user.utilisateurID,
        typeAction: 'INSCRIPTION',
        description: `Nouvelle inscription: ${user.nom} ${user.prenom} (${user.email})`,
      });

      return {
        access_token: token,
        user: {
          utilisateurID: user.utilisateurID,
          email: user.email,
          nom: user.nom,
          prenom: user.prenom,
          role: user.role,
        },
      };
    } catch (error) {
      this.logger.error(`Registration error: ${error.message}`);
      throw error;
    }
  }

  async validateToken(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verifyAsync<JwtPayload>(token);
    } catch (error) {
      this.logger.error(`Token validation error: ${error.message}`);
      throw new UnauthorizedException('Invalid token');
    }
  }
}

