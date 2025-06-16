import { Injectable, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (isPublic) {
        return true;
      }

      return super.canActivate(context);
    } catch (error) {
      this.logger.error(`Authentication error: ${error.message}`);
      throw new UnauthorizedException('Authentication failed');
    }
  }

  handleRequest(err: any, user: any, info: any) {
    if (err) {
      this.logger.error(`JWT validation error: ${err.message}`);
      throw new UnauthorizedException('Authentication failed');
    }

    if (!user) {
      this.logger.warn('No user found in JWT token');
      throw new UnauthorizedException('Invalid or expired token');
    }

    if (!user.utilisateurID) {
      this.logger.error('Invalid user object structure');
      throw new UnauthorizedException('Invalid user object structure');
    }

    return user;
  }
}
