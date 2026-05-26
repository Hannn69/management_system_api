import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import cookieParser from 'cookie-parser';

type TestModuleOptions = {
  controllers: any[];
  providers: any[];
};

export async function createTestApp({
  controllers,
  providers,
}: TestModuleOptions): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    controllers,
    providers,
  }).compile();

  const app = moduleFixture.createNestApplication();

  app.use(cookieParser());
  app.use((req, _res, next) => {
    const header = req.headers['x-test-user-id'];
    if (header) {
      const raw = Array.isArray(header) ? header[0] : header;
      req.user = {
        id: Number(raw),
        email: 'tester@example.com',
      };
    }
    next();
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  await app.init();
  return app;
}
