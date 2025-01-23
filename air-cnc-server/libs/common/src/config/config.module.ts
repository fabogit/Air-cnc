import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import { z } from 'zod';

const mongoDbUriRegex = /^(mongodb(?:\+srv)?):\/\//;
const dbEnvSchema = z.object({
  MONGODB_URI: z
    .string()
    .regex(
      mongoDbUriRegex,
      'MONGODB_URI require a valid mongo db connection string ',
    ),
});

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
