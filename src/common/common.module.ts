import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LogActivityInterceptor } from './interceptors/log-activity.interceptor';
import { JournalModule } from '../journal/journal.module';

@Module({
  imports: [JournalModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LogActivityInterceptor,
    },
  ],
})
export class CommonModule {} 