import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { LOG_ACTIVITY_KEY, LOG_ACTIVITY_OPTIONS_KEY, LogActivityOptions } from '../decorators/log-activity.decorator';
import { JournalActivityService } from '../../journal/journal-activity.service';

@Injectable()
export class LogActivityInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LogActivityInterceptor.name);

  constructor(
    private reflector: Reflector,
    private journalActivityService: JournalActivityService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const shouldLog = this.reflector.getAllAndOverride<boolean>(LOG_ACTIVITY_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    this.logger.debug(`Should log activity: ${shouldLog}`);

    if (!shouldLog) {
      return next.handle();
    }

    const options = this.reflector.getAllAndOverride<LogActivityOptions>(LOG_ACTIVITY_OPTIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    this.logger.debug(`Log activity options: ${JSON.stringify(options)}`);

    if (!options) {
      this.logger.warn('LogActivity decorator used without options');
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    this.logger.debug(`Request user: ${JSON.stringify(user)}`);

    if (!user?.utilisateurID) {
      this.logger.debug('No user found in request, skipping activity logging');
      return next.handle();
    }

    return next.handle().pipe(
      tap(async (result) => {
        try {
          const description = typeof options.description === 'function'
            ? options.description(result)
            : options.description;

          if (!description) {
            this.logger.warn('No description provided for activity logging');
            return;
          }

          await this.journalActivityService.logActivity({
            utilisateurID: user.utilisateurID,
            typeAction: options.typeAction,
            description,
            ipAdresse: request.ip,
          });
        } catch (error) {
          this.logger.error('Error logging activity:', error);
          // Don't throw the error to avoid interrupting the request
        }
      }),
    );
  }
} 