import { z } from 'zod';

/**
 * Regular expression to validate MongoDB URI strings.
 */
const mongoDbUriRegex = /^(mongodb(?:\+srv)?):\/\//;

/**
 * Zod schema for validating the reservation environment variables.
 * This schema ensures that the `MONGODB_URI` is a valid MongoDB connection string
 * and the `PORT` is a valid number between 1 and 65535.
 */
const reservationsEnvSchema = z.object({
  MONGODB_URI: z
    .string()
    .regex(
      mongoDbUriRegex,
      'MONGODB_URI require a valid mongo db connection string ',
    ),
  PORT: z.string().transform((val) => {
    const port = Number(val);
    if (isNaN(port) || port < 1 || port > 65535) {
      throw new Error('PORT must be a valid number between 1 and 65535');
    }
    return port;
  }),
});

/**
 * Validates the provided reservation environment configuration.
 *
 * This function uses the `reservationsEnvSchema` to validate the configuration object.
 * It throws a detailed error message if the validation fails, including the specific errors encountered.
 *
 * @param config The configuration object to be validated.
 * @throws {Error} A detailed error message if the validation fails.
 */
export const validateReservationsEnv = (config: Record<string, unknown>) => {
  try {
    return reservationsEnvSchema.parse(config);
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
