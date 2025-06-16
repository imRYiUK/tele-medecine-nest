import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { JournalActivityService } from '../../journal/journal-activity.service';
export declare class LogActivityInterceptor implements NestInterceptor {
    private reflector;
    private journalActivityService;
    private readonly logger;
    constructor(reflector: Reflector, journalActivityService: JournalActivityService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
