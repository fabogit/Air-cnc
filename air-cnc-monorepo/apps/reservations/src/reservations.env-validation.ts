import { plainToInstance } from 'class-transformer';
import {
  IsNumber,
  IsString,
  Matches,
  Max,
  Min,
  validateSync,
} from 'class-validator';

/**
 * Class representing environment variables for reservations.
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
   * The port number the application listens on.
   * Must be a number between 1 and 65535.
   */
  @IsNumber({ allowNaN: false }, { message: 'PORT must be a number' })
  @Min(1, { message: 'PORT must be at least 1' })
  @Max(65535, { message: 'PORT must be at most 65535' })
  PORT: number;
}

/**
 * Validates the reservations environment variables.
 * Class transformer will try to convert properties implicitly to their target type based on their typing information.
 * @param config The configuration object containing the environment variables.
 * @returns The validated EnvironmentVariables object.
 * @throws {Error} If any of the environment variables are invalid.
 */
export function validateReservationsEnv(config: Record<string, unknown>) {
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
