import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { createTestApp } from './helpers/create-test-app';

describe('App endpoint (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestApp({
      controllers: [AppController],
      providers: [AppService],
    });
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET / returns hello world', async () => {
    await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
