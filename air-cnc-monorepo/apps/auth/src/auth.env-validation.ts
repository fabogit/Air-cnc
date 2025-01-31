import { z } from 'zod';

/**
 * Regular expression to validate MongoDB URI strings.
 */
const mongoDbUriRegex = /^(mongodb(?:\+srv)?):\/\//;

/**
 * Zod schema for validating the authentication environment variables.
 * This schema ensures that the `MONGODB_URI` is a valid MongoDB connection string,
 * `JWT_SECRET` has a minimum length of 16 characters, `JWT_EXPIRATION` is a string
 * representing the JWT expiration time, and `PORT` is a valid number between 1 and 65535.
 */
const authEnvSchema = z.object({
  MONGODB_URI: z
    .string()
    .regex(
      mongoDbUriRegex,
      'MONGODB_URI require a valid mongo db connection string ',
    ),
  JWT_SECRET: z.string().min(16),
  JWT_EXPIRATION: z.string(),
  PORT: z.string().transform((val) => {
    const port = Number(val);
    if (isNaN(port) || port < 1 || port > 65535) {
      throw new Error('PORT must be a valid number between 1 and 65535');
    }
    return port;
  }),
});

/**
 * Validates the provided authentication environment configuration.
 *
 * This function uses the `authEnvSchema` to validate the configuration object.
 * It throws a detailed error message if the validation fails, including the specific errors encountered.
 *
 * @param config The configuration object to be validated.
 * @throws {Error} A detailed error message if the validation fails.
 */
export const validateAuthEnv = (config: Record<string, unknown>) => {
  try {
    return authEnvSchema.parse(config);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors
        .map((err) => `${err.path.join('.')} : ${err.message}`)
        .join('\n');

      throw new Error(`Config validation failed:\n${formattedErrors}`);
    }
    throw error;
  }
};
