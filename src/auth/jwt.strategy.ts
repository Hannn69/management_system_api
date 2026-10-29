import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

// The web app signs its session with JWT_SECRET into the `accessToken` cookie.
// Tokens issued by this API's own /auth/signin use JWT_ACCESS_SECRET in `access_token`.
const WEB_COOKIE = 'accessToken';
const API_COOKIE = 'access_token';

const cookieExtractor = (req: Request) => {
  const cookies = (req?.cookies ?? {}) as Record<string, string>;
  return cookies[WEB_COOKIE] ?? cookies[API_COOKIE] ?? null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const webSecret = configService.get<string>('JWT_SECRET');
    const apiSecret = configService.get<string>('JWT_ACCESS_SECRET');
    if (!webSecret || !apiSecret) {
      throw new Error('JWT_SECRET and JWT_ACCESS_SECRET must be set');
    }
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKeyProvider: (
        req: Request,
        rawJwt: string,
        done: (err: Error | null, secret?: string) => void,
      ) => {
        const cookies = (req?.cookies ?? {}) as Record<string, string>;
        done(null, cookies[WEB_COOKIE] === rawJwt ? webSecret : apiSecret);
      },
    });
  }

  validate(payload: { sub: number | string; email?: string; type?: string }) {
    // Web-app tokens carry a `type`; only the access kind may call the API.
    if (payload.type !== undefined && payload.type !== 'access') {
      return null;
    }
    return { id: Number(payload.sub), email: payload.email };
  }
}
