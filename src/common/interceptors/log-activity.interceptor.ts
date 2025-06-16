import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { LOG_ACTIVITY_KEY, LOG_ACTIVITY_OPTIONS_KEY, LogActivityOptions } from '../decorators/log-activity.decorator';
import { JournalActivityService } from '../../journal/journal-activity.service';

@Injectable()
export class LogActivityInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private journalActivityService: JournalActivityService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const shouldLog = this.reflector.getAllAndOverride<boolean>(LOG_ACTIVITY_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!shouldLog) {
      return next.handle();
    }

    const options = this.reflector.getAllAndOverride<LogActivityOptions>(LOG_ACTIVITY_OPTIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.utilisateurID) {
      return next.handle();
    }

    return next.handle().pipe(
      tap(async (result) => {
        try {
          const description = typeof options.description === 'function'
            ? options.description(result)
            : options.description;

          await this.journalActivityService.logActivity({
            utilisateurID: user.utilisateurID,
            typeAction: options.typeAction,
            description,
            ipAdresse: request.ip,
          });
        } catch (error) {
          // Log the error but don't interrupt the request
          console.error('Error logging activity:', error);
        }
      }),
    );
  }
} 