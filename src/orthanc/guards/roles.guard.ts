import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

interface RequestWithUser extends Request {
  user: {
    role: string;
  };
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );
    
    if (!requiredRoles) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;
    
    if (!user || !user.role) {
      return false;
    }
    
    // Vérifier si l'utilisateur a un des rôles requis
    return requiredRoles.some((role) => user.role === role);
  }
}
