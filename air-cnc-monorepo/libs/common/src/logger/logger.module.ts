import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

/**
 * Module for configuring and providing logging functionality using Pino.
 * This module sets up the Pino logger with a pretty transport for development.
 */
@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: false,
          },
        },
      },
    }),
  ],
})
export class LoggerModule {}
