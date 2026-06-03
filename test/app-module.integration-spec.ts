import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import cookieParser from 'cookie-parser';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AppModule integration (e2e)', () => {
  let app: INestApplication;
  let prisma: {
    company: {
      findMany: jest.Mock;
      count: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      company: {
        findMany: jest.fn().mockResolvedValue([
          {
            id: 1,
            slug: 'acme-slug',
            name: 'Acme Corp',
            phone: null,
            fax: null,
            email: 'ops@acme.test',
            logo: null,
            notes: null,
            createdAt: new Date('2026-01-01T00:00:00.000Z'),
            updatedAt: new Date('2026-01-02T00:00:00.000Z'),
            _count: {
              assets: 3,
              locations: 2,
              departments: 1,
            },
          },
        ]),
        count: jest.fn().mockResolvedValue(1),
      },
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('boots the full module graph and serves the root endpoint', async () => {
    await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('wires CompaniesController through CompaniesService to PrismaService', async () => {
    const response = await request(app.getHttpServer())
      .get('/companies?page=2&limit=5&search=acme&sort=name&order=asc')
      .expect(200);

    expect(prisma.company.findMany).toHaveBeenCalledWith({
      where: {
        OR: [{ name: { contains: 'acme' } }, { email: { contains: 'acme' } }],
      },
      include: {
        _count: {
          select: {
            assets: true,
            locations: true,
            departments: true,
          },
        },
      },
      orderBy: { name: 'asc' },
      skip: 5,
      take: 5,
    });
    expect(prisma.company.count).toHaveBeenCalledWith({
      where: {
        OR: [{ name: { contains: 'acme' } }, { email: { contains: 'acme' } }],
      },
    });
    expect(response.body).toEqual({
      records: [
        expect.objectContaining({
          id: 1,
          slug: 'acme-slug',
          name: 'Acme Corp',
          email: 'ops@acme.test',
          assets: 3,
          users: 0,
          licenses: 0,
          accessories: 0,
          consumables: 0,
          components: 0,
        }),
      ],
      total: 1,
    });
  });
});
