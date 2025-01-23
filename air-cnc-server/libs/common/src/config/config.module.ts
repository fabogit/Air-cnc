import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import { z } from 'zod';

/**
 * Regular expression to validate MongoDB URI strings.
 */
const mongoDbUriRegex = /^(mongodb(?:\+srv)?):\/\//;

/**
 * Zod schema for validating the database environment variables.
 */
const dbEnvSchema = z.object({
  MONGODB_URI: z
    .string()
    .regex(
      mongoDbUriRegex,
      'MONGODB_URI require a valid mongo db connection string ',
    ),
});

/**
 * Configuration module for handling environment variables and validation.
 * Uses Zod for schema validation of the MONGODB_URI.
 */
@Module({
  imports: [
    NestConfigModule.forRoot({
      validate: (config) => {
        try {
          return dbEnvSchema.parse(config);
        } catch (error) {
          if (error instanceof z.ZodError) {
            const formattedErrors = error.errors
              .map((err) => `${err.path.join('.')} : ${err.message}`)
              .join('\n');

            throw new Error(`Config validation failed:\n${formattedErrors}`);
          }
          throw error;
        }
      },
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
