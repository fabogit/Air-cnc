import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bycript from 'bcryptjs'; // bcrypt will works locally but node docker images might have problems
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
    return this.usersRepository.create({
      ...createUserDto,
      password: await bycript.hash(createUserDto.password, 10),
    });
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const isPasswordValid = await bycript.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }
    return user;
  }
}
