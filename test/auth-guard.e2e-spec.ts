import { Controller, Get, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import cookieParser from 'cookie-parser';
import request from 'supertest';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { JwtStrategy } from '../src/auth/jwt.strategy';
import { Public } from '../src/auth/public.decorator';

const WEB_SECRET = 'web-secret';
const API_SECRET = 'api-secret';

@Controller()
class ProbeController {
  @Public()
  @Get('open')
  open() {
    return { ok: true };
  }

  @Get('secret')
  secret() {
    return { ok: true };
  }
}

describe('Global JwtAuthGuard (e2e)', () => {
  let app: INestApplication;
  let jwt: JwtService;

  beforeAll(async () => {
    const settings: Record<string, string> = {
      JWT_SECRET: WEB_SECRET,
      JWT_ACCESS_SECRET: API_SECRET,
    };
    const moduleRef = await Test.createTestingModule({
      imports: [PassportModule, JwtModule.register({})],
      controllers: [ProbeController],
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: { get: (k: string) => settings[k] },
        },
        { provide: APP_GUARD, useClass: JwtAuthGuard },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.use(cookieParser());
    await app.init();
    jwt = moduleRef.get(JwtService);
  });

  afterAll(() => app.close());

  const webToken = (payload: object, secret = WEB_SECRET) =>
    jwt.sign({ sub: '7', ...payload }, { secret, expiresIn: 60 });

  it('lets @Public routes through without a login', async () => {
    await request(app.getHttpServer()).get('/open').expect(200);
  });

  it('rejects other routes without a login', async () => {
    await request(app.getHttpServer()).get('/secret').expect(401);
  });

  it('accepts the web app session cookie signed with JWT_SECRET', async () => {
    await request(app.getHttpServer())
      .get('/secret')
      .set('Cookie', `accessToken=${webToken({ type: 'access' })}`)
      .expect(200);
  });

  it('accepts the API access_token cookie signed with JWT_ACCESS_SECRET', async () => {
    const token = jwt.sign(
      { sub: 7, email: 'a@b.c' },
      { secret: API_SECRET, expiresIn: 60 },
    );
    await request(app.getHttpServer())
      .get('/secret')
      .set('Cookie', `access_token=${token}`)
      .expect(200);
  });

  it('rejects a web token signed with the wrong secret', async () => {
    await request(app.getHttpServer())
      .get('/secret')
      .set('Cookie', `accessToken=${webToken({ type: 'access' }, 'forged')}`)
      .expect(401);
  });

  it('rejects a refresh token presented as an access token', async () => {
    await request(app.getHttpServer())
      .get('/secret')
      .set('Cookie', `accessToken=${webToken({ type: 'refresh' })}`)
      .expect(401);
  });

  it('rejects an expired token', async () => {
    const token = jwt.sign(
      { sub: '7', type: 'access' },
      { secret: WEB_SECRET, expiresIn: -10 },
    );
    await request(app.getHttpServer())
      .get('/secret')
      .set('Cookie', `accessToken=${token}`)
      .expect(401);
  });
});
