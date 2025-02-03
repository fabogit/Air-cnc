import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { LoggerModule } from '@app/common';
import { validateAuthEnv } from './auth.env-validation';
import { LocalStrategy } from './strategy/local.strategy';

/**
 * Module for handling authentication-related functionality.
 *
 * This module imports the following:
 * - `UsersModule`: Provides user-related functionality.
 * - `LoggerModule`: Provides logging functionality.
 * - `JwtModule`: Configures JWT authentication using environment variables for the secret and expiration time.
 *
 * It provides the following:
 * - `AuthController`: Handles authentication-related API requests.
 * - `AuthService`: Provides business logic for user authentication.
 *
 * The `ConfigModule.forRoot` import with the `validateAuthEnv` function ensures that the authentication environment variables are validated during application startup.
 */
@Module({
  imports: [
    UsersModule,
    LoggerModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<number>('JWT_EXPIRATION'),
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateAuthEnv,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
