import { Module } from '@nestjs/common';
import { DatabaseModule, LoggerModule } from '@app/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UserDocument, UserSchema } from './models/user.schema';

/**
 * Module for managing user-related functionality.
 * This module imports the `DatabaseModule` (providing general database access)
 * and configures a feature module for the user collection using the `User` schema.
 * It also imports the `LoggerModule` and provides the `UsersController`, `UsersService`,
 * and `UsersRepository` for user management operations.
 * Finally, it exports the `UsersService` to make it available to other modules.
 */
@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
    LoggerModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
