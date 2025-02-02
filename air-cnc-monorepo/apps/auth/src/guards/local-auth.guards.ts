import { AuthGuard } from '@nestjs/passport';

export class LocalAuthGuard extends AuthGuard(
  'local', // from LocalStrategy -> PassportStrategy(Strategy.name) nestjs/passport
) {}
