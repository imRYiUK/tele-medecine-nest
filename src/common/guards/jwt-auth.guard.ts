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
      // Check if the route is marked as public
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (isPublic) {
        return true;
      }

      // For non-public routes, proceed with JWT validation
      return super.canActivate(context);
    } catch (error) {
      this.logger.error(`Error in JwtAuthGuard: ${error.message}`);
      throw new UnauthorizedException('Authentication failed');
    }
  }

  handleRequest(err: any, user: any, info: any) {
    // Log authentication errors for debugging
    if (err) {
      this.logger.error(`JWT Authentication error: ${err.message}`);
      throw new UnauthorizedException('Authentication failed');
    }

    if (!user) {
      this.logger.warn('No user found in JWT token');
      throw new UnauthorizedException('Invalid or expired token');
    }

    // Log successful authentication
    this.logger.debug(`User authenticated: ${user.email}`);

    return user;
  }
}
