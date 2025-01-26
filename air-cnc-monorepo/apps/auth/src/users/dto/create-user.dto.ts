import { IsEmail, IsStrongPassword } from 'class-validator';

/**
 * Data Transfer Object (DTO) for creating a new user.
 * This DTO is used for validating user creation requests.
 * @property email: The user's email address.
 * @property password: The user's password.
 */
export class CreateUserDto {
  /**
   * The user's email address. Must be a valid email format.
   */
  @IsEmail()
  email: string;

  /**
   * The user's password. Must meet strong password criteria.
   */
  @IsStrongPassword()
  password: string;
}
