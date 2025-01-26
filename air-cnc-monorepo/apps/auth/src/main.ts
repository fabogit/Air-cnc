import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Logger } from 'nestjs-pino';
import { ValidationPipe, Logger as NestLogger } from '@nestjs/common';

async function bootstrap() {
  const logger = new NestLogger('Bootstrap', { timestamp: true });

  const app = await NestFactory.create(AuthModule, {
    bufferLogs: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useLogger(app.get(Logger));

  const port = process.env.port ?? 3001;
  await app.listen(port, () => logger.log(`Auth running on port:${port}`));
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
