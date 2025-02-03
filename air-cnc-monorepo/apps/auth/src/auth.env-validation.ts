import { plainToInstance } from 'class-transformer';
import {
  IsNumber,
  IsString,
  Matches,
  Max,
  Min,
  MinLength,
  validateSync,
} from 'class-validator';
/**
 * Class representing environment variables for authentication.
 * This class defines and validates the required environment variables.
 */
class EnvironmentVariables {
  /**
   * The MongoDB connection URI.
   * Must be a valid MongoDB connection string.
   */
  @Matches(/^(mongodb(?:\+srv)?):\/\//, {
    message: 'MONGODB_URI require a valid mongo db connection string',
  })
  @IsString()
  MONGODB_URI: string;

  /**
   * The secret key used for JWT signing.
   * Must be at least 16 characters long.
   */
  @IsString()
  @MinLength(16, { message: 'JWT_SECRET must be at least 16 characters long' })
  JWT_SECRET: string;

  /**
   * The JWT expiration time in seconds.
   * Must be a number.
   */
  @IsNumber({ allowNaN: false }, { message: 'JWT_EXPIRATION must be a number' })
  JWT_EXPIRATION: number;

  /**
   * The port number the application listens on.
   * Must be a number between 1 and 65535.
   */
  @IsNumber({ allowNaN: false }, { message: 'PORT must be a number' })
  @Min(1, { message: 'PORT must be at least 1' })
  @Max(65535, { message: 'PORT must be at most 65535' })
  PORT: number;
}

/**
 * Validates the authentication environment variables.
 * Class transformer will try to convert properties implicitly to their target type based on their typing information.
 * @param config The configuration object containing the environment variables.
 * @returns The validated EnvironmentVariables object.
 * @throws {Error} If any of the environment variables are invalid.
 */
export function validateAuthEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
