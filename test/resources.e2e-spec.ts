import { INestApplication, Type } from '@nestjs/common';
import request from 'supertest';
import { AssetModelsController } from '../src/asset-models/asset-models.controller';
import { AssetModelsService } from '../src/asset-models/asset-models.service';
import { CategoriesController } from '../src/categories/categories.controller';
import { CategoriesService } from '../src/categories/categories.service';
import { CompaniesController } from '../src/companies/companies.controller';
import { CompaniesService } from '../src/companies/companies.service';
import { DepartmentsController } from '../src/departments/departments.controller';
import { DepartmentsService } from '../src/departments/departments.service';
import { LocationsController } from '../src/locations/locations.controller';
import { LocationsService } from '../src/locations/locations.service';
import { ManufacturersController } from '../src/manufacturers/manufacturers.controller';
import { ManufacturersService } from '../src/manufacturers/manufacturers.service';
import { StatusLabelsController } from '../src/status-labels/status-labels.controller';
import { StatusLabelsService } from '../src/status-labels/status-labels.service';
import { SuppliersController } from '../src/suppliers/suppliers.controller';
import { SuppliersService } from '../src/suppliers/suppliers.service';
import { createTestApp } from './helpers/create-test-app';

type ResourceCase = {
  label: string;
  route: string;
  controller: Type<any>;
  serviceToken: Type<any>;
  validCreateBody: Record<string, unknown>;
  invalidCreateBody: Record<string, unknown>;
  validUpdateBody: Record<string, unknown>;
};

const resourceCases: ResourceCase[] = [
  {
    label: 'asset-models',
    route: '/asset-models',
    controller: AssetModelsController,
    serviceToken: AssetModelsService,
    validCreateBody: { name: 'Model A', categoryId: 1, manufacturerId: 2 },
    invalidCreateBody: {},
    validUpdateBody: { notes: 'Updated asset model' },
  },
  {
    label: 'categories',
    route: '/categories',
    controller: CategoriesController,
    serviceToken: CategoriesService,
    validCreateBody: { name: 'Laptops', type: 'Asset' },
    invalidCreateBody: {},
    validUpdateBody: { notes: 'Updated category' },
  },
  {
    label: 'companies',
    route: '/companies',
    controller: CompaniesController,
    serviceToken: CompaniesService,
    validCreateBody: { name: 'Acme Corp' },
    invalidCreateBody: {},
    validUpdateBody: { notes: 'Updated company' },
  },
  {
    label: 'departments',
    route: '/departments',
    controller: DepartmentsController,
    serviceToken: DepartmentsService,
    validCreateBody: { name: 'Engineering' },
    invalidCreateBody: {},
    validUpdateBody: { notes: 'Updated department' },
  },
  {
    label: 'locations',
    route: '/locations',
    controller: LocationsController,
    serviceToken: LocationsService,
    validCreateBody: { name: 'HQ' },
    invalidCreateBody: {},
    validUpdateBody: { notes: 'Updated location' },
  },
  {
    label: 'manufacturers',
    route: '/manufacturers',
    controller: ManufacturersController,
    serviceToken: ManufacturersService,
    validCreateBody: { name: 'Dell' },
    invalidCreateBody: {},
    validUpdateBody: { notes: 'Updated manufacturer' },
  },
  {
    label: 'status-labels',
    route: '/status-labels',
    controller: StatusLabelsController,
    serviceToken: StatusLabelsService,
    validCreateBody: { name: 'Pending' },
    invalidCreateBody: {},
    validUpdateBody: { notes: 'Updated status label' },
  },
  {
    label: 'suppliers',
    route: '/suppliers',
    controller: SuppliersController,
    serviceToken: SuppliersService,
    validCreateBody: { name: 'CDW' },
    invalidCreateBody: {},
    validUpdateBody: { notes: 'Updated supplier' },
  },
];

describe.each(resourceCases)('$label CRUD endpoints (e2e)', (resourceCase) => {
  let app: INestApplication;
  let service: {
    findAll: jest.Mock;
    findOne: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    remove: jest.Mock;
  };

  beforeEach(async () => {
    service = {
      findAll: jest.fn().mockResolvedValue({ records: [{ id: 1 }], total: 1 }),
      findOne: jest.fn().mockResolvedValue({ id: 1, slug: 'record-slug' }),
      create: jest
        .fn()
        .mockResolvedValue({ id: 1, slug: 'record-slug', ...resourceCase.validCreateBody }),
      update: jest
        .fn()
        .mockResolvedValue({ id: 1, slug: 'record-slug', ...resourceCase.validUpdateBody }),
      remove: jest.fn().mockResolvedValue({ success: true }),
    };

    app = await createTestApp({
      controllers: [resourceCase.controller],
      providers: [{ provide: resourceCase.serviceToken, useValue: service }],
    });
  });

  afterEach(async () => {
    await app.close();
  });

  it(`GET ${resourceCase.route} returns paginated records`, async () => {
    const response = await request(app.getHttpServer())
      .get(resourceCase.route)
      .expect(200);

    expect(service.findAll).toHaveBeenCalled();
    expect(response.body).toEqual({ records: [{ id: 1 }], total: 1 });
  });

  it(`GET ${resourceCase.route}/:idOrSlug returns one record`, async () => {
    const response = await request(app.getHttpServer())
      .get(`${resourceCase.route}/record-slug`)
      .expect(200);

    expect(service.findOne).toHaveBeenCalledWith('record-slug');
    expect(response.body).toEqual({ record: { id: 1, slug: 'record-slug' } });
  });

  it(`POST ${resourceCase.route} currently forwards an empty payload through the shared base controller`, async () => {
    const response = await request(app.getHttpServer())
      .post(resourceCase.route)
      .send(resourceCase.invalidCreateBody)
      .expect(201);

    expect(service.create).toHaveBeenCalledWith(resourceCase.invalidCreateBody, 1);
    expect(response.body.record.id).toBe(1);
  });

  it(`POST ${resourceCase.route} creates a record`, async () => {
    const response = await request(app.getHttpServer())
      .post(resourceCase.route)
      .send(resourceCase.validCreateBody)
      .expect(201);

    expect(service.create).toHaveBeenCalledWith(resourceCase.validCreateBody, 1);
    expect(response.body.record.id).toBe(1);
  });

  it(`PATCH ${resourceCase.route}/:idOrSlug updates a record`, async () => {
    const response = await request(app.getHttpServer())
      .patch(`${resourceCase.route}/record-slug`)
      .send(resourceCase.validUpdateBody)
      .expect(200);

    expect(service.update).toHaveBeenCalledWith(
      'record-slug',
      resourceCase.validUpdateBody,
      1,
    );
    expect(response.body).toEqual({
      record: { id: 1, slug: 'record-slug', ...resourceCase.validUpdateBody },
    });
  });

  it(`DELETE ${resourceCase.route}/:id deletes a record`, async () => {
    const response = await request(app.getHttpServer())
      .delete(`${resourceCase.route}/1`)
      .expect(200);

    expect(service.remove).toHaveBeenCalledWith(1, 1);
    expect(response.body).toEqual({ success: true });
  });
});
