import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

/**
 * Service for managing user-related operations.
 */
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  /**
   * Creates a new user.
   * @param createUserDto Data for the new user.
   * @returns A Promise that resolves to the created user.
   */
  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }
}
