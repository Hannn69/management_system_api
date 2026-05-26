jest.mock('@nestjs/passport', () => ({
  AuthGuard: () =>
    class {
      canActivate(context: any) {
        const req = context.switchToHttp().getRequest();
        const header = req.headers['x-test-user-id'];
        if (!header) {
          return false;
        }
        const raw = Array.isArray(header) ? header[0] : header;
        req.user = { id: Number(raw), email: 'guard@example.com' };
        return true;
      }
    },
}));

import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';
import { createTestApp } from './helpers/create-test-app';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authService: {
    register: jest.Mock;
    signIn: jest.Mock;
    refresh: jest.Mock;
    logout: jest.Mock;
    getUserIdFromRefreshToken: jest.Mock;
  };

  beforeEach(async () => {
    authService = {
      register: jest.fn().mockResolvedValue({
        user: { id: 1, email: 'new@example.com' },
        tokens: {
          accessToken: 'access-token',
          refreshToken: 'refresh-token',
          accessTtlMs: 1000,
          refreshTtlMs: 2000,
        },
      }),
      signIn: jest.fn().mockResolvedValue({
        user: { id: 2, email: 'signin@example.com' },
        tokens: {
          accessToken: 'signin-access',
          refreshToken: 'signin-refresh',
          accessTtlMs: 1000,
          refreshTtlMs: 2000,
        },
      }),
      refresh: jest.fn().mockResolvedValue({
        user: { id: 3, email: 'refresh@example.com' },
        tokens: {
          accessToken: 'refresh-access',
          refreshToken: 'refresh-refresh',
          accessTtlMs: 1000,
          refreshTtlMs: 2000,
        },
      }),
      logout: jest.fn().mockResolvedValue(undefined),
      getUserIdFromRefreshToken: jest.fn().mockResolvedValue(7),
    };

    app = await createTestApp({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    });
  });

  afterEach(async () => {
    await app.close();
  });

  it('POST /auth/register validates payload', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'bad-email', password: 'short' })
      .expect(400);
  });

  it('POST /auth/register sets auth cookies and returns user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'new@example.com', password: 'strong-pass-123' })
      .expect(201);

    expect(authService.register).toHaveBeenCalledWith(
      'new@example.com',
      'strong-pass-123',
    );
    expect(response.body).toEqual({
      user: { id: 1, email: 'new@example.com' },
    });
    expect(response.headers['set-cookie']).toEqual(
      expect.arrayContaining([
        expect.stringContaining('access_token=access-token'),
        expect.stringContaining('refresh_token=refresh-token'),
      ]),
    );
  });

  it('POST /auth/signin sets auth cookies and returns user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: 'signin@example.com', password: 'strong-pass-123' })
      .expect(201);

    expect(authService.signIn).toHaveBeenCalledWith(
      'signin@example.com',
      'strong-pass-123',
    );
    expect(response.body.user.email).toBe('signin@example.com');
  });

  it('POST /auth/refresh returns 401 when cookie is missing', async () => {
    await request(app.getHttpServer()).post('/auth/refresh').expect(401);
    expect(authService.refresh).not.toHaveBeenCalled();
  });

  it('POST /auth/refresh rotates cookies when refresh token exists', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/refresh')
      .set('Cookie', ['refresh_token=existing-token'])
      .expect(201);

    expect(authService.refresh).toHaveBeenCalledWith('existing-token');
    expect(response.body.user.email).toBe('refresh@example.com');
  });

  it('POST /auth/logout clears cookies even without refresh token', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/logout')
      .expect(201);

    expect(response.body).toEqual({ success: true });
    expect(response.headers['set-cookie']).toEqual(
      expect.arrayContaining([
        expect.stringContaining('access_token=;'),
        expect.stringContaining('refresh_token=;'),
      ]),
    );
  });

  it('POST /auth/logout revokes refresh token when present', async () => {
    await request(app.getHttpServer())
      .post('/auth/logout')
      .set('Cookie', ['refresh_token=existing-token'])
      .expect(201);

    expect(authService.getUserIdFromRefreshToken).toHaveBeenCalledWith(
      'existing-token',
    );
    expect(authService.logout).toHaveBeenCalledWith(7);
  });

  it('GET /auth/me returns authenticated user', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/me')
      .set('x-test-user-id', '99')
      .expect(200);

    expect(response.body).toEqual({
      user: { id: 99, email: 'tester@example.com' },
    });
  });
});
