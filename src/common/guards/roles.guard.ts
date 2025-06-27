import { Injectable, CanActivate, ExecutionContext, ForbiddenException, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../constants/roles';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
      console.log(requiredRoles);
      if (!requiredRoles) {
        return true;
      }

      const { user } = context.switchToHttp().getRequest();
      
      if (!user) {
        this.logger.warn('No user found in request');
        throw new ForbiddenException('User not found in request');
      }

      if (!user.role) {
        this.logger.warn(`User ${user.email} has no role assigned`);
        throw new ForbiddenException('User has no role assigned');
      }

      const hasRole = requiredRoles.some((role) => user.role === role);
      
      if (!hasRole) {
        this.logger.warn(`User ${user.email} with role ${user.role} attempted to access resource requiring roles: ${requiredRoles.join(', ')}`);
        throw new ForbiddenException('Insufficient permissions');
      }

      this.logger.debug(`User ${user.email} with role ${user.role} authorized to access resource`);
      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      this.logger.error(`Error in RolesGuard: ${error.message}`);
      throw new ForbiddenException('Access denied');
    }
  }
}
