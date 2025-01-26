import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { LoggerModule } from '@app/common';

/**
 * Module for handling authentication-related functionality.
 * This module imports the UsersModule and LoggerModule, and provides
 * the AuthController and AuthService for user authentication.
 */
@Module({
  imports: [UsersModule, LoggerModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
