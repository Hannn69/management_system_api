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
import { AssetsController } from '../src/assets/assets.controller';
import { AssetsService } from '../src/assets/assets.service';
import { DashboardController } from '../src/dashboard/dashboard.controller';
import { DashboardService } from '../src/dashboard/dashboard.service';
import { UsersController } from '../src/users/users.controller';
import { UsersService } from '../src/users/users.service';
import { createTestApp } from './helpers/create-test-app';

describe('Protected and custom endpoints (e2e)', () => {
  let app: INestApplication;
  let assetsService: {
    findAll: jest.Mock;
    findOne: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    remove: jest.Mock;
  };
  let usersService: {
    findAll: jest.Mock;
    create: jest.Mock;
  };
  let dashboardService: {
    getSummary: jest.Mock;
  };

  beforeEach(async () => {
    assetsService = {
      findAll: jest.fn().mockResolvedValue({ records: [{ id: 1 }], total: 1 }),
      findOne: jest.fn().mockResolvedValue({ id: 1, slug: 'asset-1' }),
      create: jest.fn().mockResolvedValue({ id: 1, assetTag: 'AST-1' }),
      update: jest.fn().mockResolvedValue({ id: 1, assetTag: 'AST-1' }),
      remove: jest.fn().mockResolvedValue({ success: true }),
    };
    usersService = {
      findAll: jest.fn().mockResolvedValue({ records: [{ id: 1 }], total: 1 }),
      create: jest.fn().mockResolvedValue({ id: 1, email: 'new@example.com' }),
    };
    dashboardService = {
      getSummary: jest.fn().mockResolvedValue({
        assetModels: 1,
        categories: 2,
      }),
    };

    app = await createTestApp({
      controllers: [AssetsController, UsersController, DashboardController],
      providers: [
        { provide: AssetsService, useValue: assetsService },
        { provide: UsersService, useValue: usersService },
        { provide: DashboardService, useValue: dashboardService },
      ],
    });
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET /assets returns records', async () => {
    const response = await request(app.getHttpServer()).get('/assets').expect(200);

    expect(assetsService.findAll).toHaveBeenCalled();
    expect(response.body).toEqual({ records: [{ id: 1 }], total: 1 });
  });

  it('GET /assets/:idOrSlug returns wrapped record', async () => {
    const response = await request(app.getHttpServer())
      .get('/assets/asset-1')
      .expect(200);

    expect(assetsService.findOne).toHaveBeenCalledWith('asset-1');
    expect(response.body).toEqual({ record: { id: 1, slug: 'asset-1' } });
  });

  it('POST /assets currently accepts an empty payload through the shared base controller', async () => {
    const response = await request(app.getHttpServer())
      .post('/assets')
      .send({})
      .expect(201);

    expect(assetsService.create).toHaveBeenCalledWith({}, 1);
    expect(response.body).toEqual({ record: { id: 1, assetTag: 'AST-1' } });
  });

  it('POST /assets creates a record', async () => {
    const response = await request(app.getHttpServer())
      .post('/assets')
      .send({
        assetTag: 'AST-100',
        modelId: 1,
        statusId: 2,
      })
      .expect(201);

    expect(assetsService.create).toHaveBeenCalledWith(
      {
        assetTag: 'AST-100',
        modelId: 1,
        statusId: 2,
      },
      1,
    );
    expect(response.body.record.assetTag).toBe('AST-1');
  });

  it('PATCH /assets/:idOrSlug returns 401 without req.user', async () => {
    await request(app.getHttpServer())
      .patch('/assets/asset-1')
      .send({ name: 'Updated' })
      .expect(401);

    expect(assetsService.update).not.toHaveBeenCalled();
  });

  it('PATCH /assets/:idOrSlug updates when req.user exists', async () => {
    const response = await request(app.getHttpServer())
      .patch('/assets/asset-1')
      .set('x-test-user-id', '44')
      .send({ name: 'Updated' })
      .expect(200);

    expect(assetsService.update).toHaveBeenCalledWith(
      'asset-1',
      { name: 'Updated' },
      44,
    );
    expect(response.body).toEqual({ record: { id: 1, assetTag: 'AST-1' } });
  });

  it('DELETE /assets/:id removes an asset', async () => {
    const response = await request(app.getHttpServer())
      .delete('/assets/1')
      .expect(200);

    expect(assetsService.remove).toHaveBeenCalledWith(1, 1);
    expect(response.body).toEqual({ success: true });
  });

  it('GET /users returns records', async () => {
    const response = await request(app.getHttpServer()).get('/users').expect(200);

    expect(usersService.findAll).toHaveBeenCalled();
    expect(response.body.records).toHaveLength(1);
  });

  it('POST /users creates a user when authenticated', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .set('x-test-user-id', '55')
      .send({
        email: 'new@example.com',
        username: 'newuser',
        password: 'strongpass',
        confirmPassword: 'strongpass',
      })
      .expect(201);

    expect(usersService.create).toHaveBeenCalledWith(
      {
        email: 'new@example.com',
        username: 'newuser',
        password: 'strongpass',
        confirmPassword: 'strongpass',
      },
      55,
    );
    expect(response.body).toEqual({ id: 1, email: 'new@example.com' });
  });

  it('GET /dashboard/summary returns summary for authenticated user', async () => {
    const response = await request(app.getHttpServer())
      .get('/dashboard/summary')
      .set('x-test-user-id', '77')
      .expect(200);

    expect(dashboardService.getSummary).toHaveBeenCalled();
    expect(response.body).toEqual({ assetModels: 1, categories: 2 });
  });
});
