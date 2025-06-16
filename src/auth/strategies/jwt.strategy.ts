import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', 'your-secret-key-should-be-changed-in-production'),
    });
  }

  async validate(payload: JwtPayload) {
    try {
      // Fetch the user to get the most up-to-date information
      const user = await this.usersService.findById(payload.sub);
      
      if (!user) {
        this.logger.warn(`User not found for ID: ${payload.sub}`);
        throw new UnauthorizedException('User not found or token invalid');
      }

      if (!user.estActif) {
        this.logger.warn(`Inactive user attempted to authenticate: ${user.email}`);
        throw new UnauthorizedException('User account is inactive');
      }
      
      // Return only the necessary user information
      const userInfo = {
        userId: user.utilisateurID,
        email: user.email,
        role: user.role,
        nom: user.nom,
        prenom: user.prenom
      };

      this.logger.debug(`User authenticated successfully: ${user.email}`);
      return userInfo;
    } catch (error) {
      this.logger.error(`Error validating JWT token: ${error.message}`);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
