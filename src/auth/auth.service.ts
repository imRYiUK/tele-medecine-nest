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
  ) {
  }

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
    const { email, password } = loginDto;

    // Rechercher l'utilisateur
    const user = await this.prisma.utilisateur.findFirst({
      where: {
        OR: [
          { email },
          { email: email },
        ],
      },
    });

    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    // Vérifier si l'utilisateur est actif
    if (!user.estActif) {
      throw new UnauthorizedException('Compte désactivé');
    }

    // Générer le token JWT
    const payload = {
      sub: user.utilisateurID,
      email: user.email,
      role: user.role
    };

    const token = this.jwtService.sign(payload);

    // Ne pas renvoyer le mot de passe
    const { password: _, ...result } = user;

    return {
      user: result,
      token,
    };
  }

  async revokeToken(token: string) {
    // Comme la table RevokedToken a été supprimée, nous pourrions implémenter
    // une autre solution comme Redis pour stocker les tokens révoqués
    // Pour l'instant, nous allons simplement logger la révocation
    this.logger.log(`Token revoked: ${token.substring(0, 10)}...`);
    return { success: true };
  }

  async register(registerDto: RegisterDto) {
    const { password, ...userData } = registerDto;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.prisma.utilisateur.findFirst({
      where: {
        OR: [
          { email: userData.email },
          { username: userData.username },
        ],
      },
    });

    if (existingUser) {
      throw new ConflictException('Un utilisateur avec cet email ou ce nom d\'utilisateur existe déjà');
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = await this.prisma.utilisateur.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    // Générer le token JWT
    const payload = {
      sub: user.utilisateurID,
      email: user.email,
      role: user.role
    };

    const token = this.jwtService.sign(payload);

    // Ne pas renvoyer le mot de passe
    const { password: _, ...result } = user;

    return {
      user: result,
      token,
    };
  }
}