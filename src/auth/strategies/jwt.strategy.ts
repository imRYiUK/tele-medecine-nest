import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload) {
    try {
      if (!payload.sub) {
        this.logger.error('JWT payload missing sub claim');
        throw new UnauthorizedException('Invalid token structure');
      }

      const user = await this.prisma.utilisateur.findUnique({
        where: { utilisateurID: payload.sub },
      });

      if (!user) {
        this.logger.warn(`User not found for ID: ${payload.sub}`);
        throw new UnauthorizedException('User not found');
      }

      if (!user.estActif) {
        this.logger.warn(`Inactive user attempted to authenticate: ${user.email}`);
        throw new UnauthorizedException('Account is inactive');
      }

      return {
        utilisateurID: user.utilisateurID,
        email: user.email,
        role: user.role,
        nom: user.nom,
        prenom: user.prenom,
        estActif: user.estActif
      };
    } catch (error) {
      this.logger.error(`JWT validation error: ${error.message}`);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
