import { Injectable } from '@nestjs/common';
import { UserDocument } from './users/models/user.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  login(user: UserDocument, response: Response) {
    const tokenPayload = {
      userId: user._id.toHexString(),
    };
    const jwtExpiresOn = new Date();
    const cookieDuration = this.configService.get('JWT_EXPIRATION') as number;
    jwtExpiresOn.setSeconds(jwtExpiresOn.getSeconds() + cookieDuration);

    const token = this.jwtService.sign(tokenPayload);
    response.cookie('Authentication', token, {
      httpOnly: true,
      expires: jwtExpiresOn,
    });
  }
}
