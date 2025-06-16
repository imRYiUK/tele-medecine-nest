import { BadRequestException, ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../common/dto/user.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private prisma: PrismaService,
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

    const isPasswordValid = await this.comparePasswords(pass, user.password);

    if (!isPasswordValid) {
      return null;
    }
    
    this.logger.log(`Successful login for user ID: ${user.utilisateurID}`);
    return user;
  }

  async login(user: UserDto) {
    const payload = {
      sub: user.utilisateurID,
      email: user.email,
      role: user.role, // Accéder au nom du rôle via la relation
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

  async register(registerDto: RegisterDto) {
    try {
      // Check if username already exists
      const existingUsername = await this.prisma.utilisateur.findUnique({
        where: { username: registerDto.username },
      });

      if (existingUsername) {
        throw new ConflictException('Ce nom d\'utilisateur est déjà utilisé');
      }

      // Check if email already exists
      const existingEmail = await this.prisma.utilisateur.findUnique({
        where: { email: registerDto.email },
      });

      if (existingEmail) {
        throw new ConflictException('Cet email est déjà utilisé');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      // Create the user
      const user = await this.prisma.utilisateur.create({
        data: {
          nom: registerDto.nom,
          prenom: registerDto.prenom,
          username: registerDto.username,
          password: hashedPassword,
          email: registerDto.email,
          telephone: registerDto.telephone,
          role: registerDto.role,
          etablissementID: registerDto.etablissementID,
          estActif: registerDto.estActif,
        },
        select: {
          utilisateurID: true,
          nom: true,
          prenom: true,
          username: true,
          email: true,
          telephone: true,
          role: true,
          etablissementID: true,
          estActif: true,
        },
      });

      return {
        message: 'Utilisateur créé avec succès',
        user,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException('Erreur lors de la création de l\'utilisateur');
    }
  }


  async comparePasswords(passwordIn: string, passwordBD: string): Promise<boolean> {
    return await bcrypt.compare(passwordIn, passwordBD);
  }
}

