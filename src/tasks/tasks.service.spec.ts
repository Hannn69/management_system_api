import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { TasksService } from './tasks.service';

const row = (over: Record<string, unknown> = {}) => ({
  id: 1,
  key: 'TASK-1',
  slug: 'slug-1',
  summary: 'Do it',
  dueDate: null,
  startDate: null,
  subtasks: null,
  ...over,
});

describe('TasksService', () => {
  let prisma: any;
  let service: TasksService;

  beforeEach(() => {
    prisma = {
      task: {
        findMany: jest.fn().mockResolvedValue([]),
        count: jest.fn().mockResolvedValue(0),
        findFirst: jest.fn(),
        create: jest
          .fn()
          .mockImplementation(({ data }) => Promise.resolve(row(data))),
        update: jest
          .fn()
          .mockImplementation(({ data }) => Promise.resolve(row(data))),
        delete: jest.fn().mockResolvedValue({}),
      },
      user: {
        findUnique: jest
          .fn()
          .mockResolvedValue({ username: 'admin', email: 'a@b.c' }),
      },
    };
    service = new TasksService(prisma as PrismaService);
  });

  describe('findAll', () => {
    const queryOf = async (query: object) => {
      await service.findAll(query);
      return prisma.task.findMany.mock.calls[0][0] as {
        where: any;
        orderBy: any;
        skip: number;
        take: number;
      };
    };

    it('filters by status, space and search', async () => {
      const args = await queryOf({
        status: 'Done',
        space: 'PLAT',
        search: ' bug ',
      });

      expect(args.where.status).toBe('Done');
      expect(args.where.space).toEqual({ contains: 'PLAT' });
      expect(args.where.OR).toHaveLength(4);
    });

    it('treats status "All" as no filter', async () => {
      expect((await queryOf({ status: 'All' })).where.status).toBeUndefined();
    });

    it('only sorts by known columns and caps the page size', async () => {
      const args = await queryOf({
        sort: 'passwordHash',
        order: 'asc',
        limit: '99999',
        page: '3',
      });

      expect(args.orderBy).toEqual({ updatedAt: 'asc' });
      expect(args.take).toBe(100);
      expect(args.skip).toBe(200);
    });

    it('returns dates as YYYY-MM-DD and subtasks as an array', async () => {
      prisma.task.findMany.mockResolvedValue([
        row({ dueDate: new Date('2026-12-01T00:00:00Z') }),
      ]);

      const { tasks } = await service.findAll({});

      expect(tasks[0]).toMatchObject({
        dueDate: '2026-12-01',
        startDate: '',
        subtasks: [],
      });
    });
  });

  describe('create', () => {
    it('numbers the key after the space prefix and the highest existing number', async () => {
      prisma.task.findMany.mockResolvedValue([
        { key: 'PLAT-2' },
        { key: 'PLAT-10' },
        { key: 'PLAT-x' },
      ]);

      await service.create({ summary: 'x', space: 'platform (PLAT)' }, 7);

      expect(prisma.task.create.mock.calls[0][0].data.key).toBe('PLAT-11');
    });

    it('falls back to the TASK prefix', async () => {
      await service.create({ summary: 'x' }, 7);

      expect(prisma.task.create.mock.calls[0][0].data.key).toBe('TASK-1');
    });

    it('records the logged-in user and defaults the reporter to them', async () => {
      await service.create({ summary: 'x' }, 7);

      expect(prisma.task.create.mock.calls[0][0].data).toMatchObject({
        userId: 7,
        createdBy: 7,
        updatedBy: 7,
        reporter: 'admin',
      });
    });

    it('rejects an invalid date', async () => {
      await expect(
        service.create({ summary: 'x', dueDate: 'nope' }, 7),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(prisma.task.create).not.toHaveBeenCalled();
    });

    it('retries with a new key when two creates pick the same number', async () => {
      const clash = new Prisma.PrismaClientKnownRequestError('dup', {
        code: 'P2002',
        clientVersion: 'test',
      });
      prisma.task.create.mockRejectedValueOnce(clash);

      await service.create({ summary: 'x' }, 7);

      expect(prisma.task.create).toHaveBeenCalledTimes(2);
    });
  });

  describe('update', () => {
    beforeEach(() => {
      prisma.task.findFirst.mockResolvedValue(row());
    });

    it('clears a date with an empty string and leaves untouched fields alone', async () => {
      await service.update('TASK-1', { dueDate: '' }, 9);

      const { data } = prisma.task.update.mock.calls[0][0];
      expect(data.dueDate).toBeNull();
      expect(data.startDate).toBeUndefined();
      expect(data.updatedBy).toBe(9);
    });

    it('404s for an unknown task', async () => {
      prisma.task.findFirst.mockResolvedValue(null);

      await expect(service.update('NOPE-1', {}, 9)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  it('finds a task by key or by slug', async () => {
    prisma.task.findFirst.mockResolvedValue(row());

    await service.findOne('TASK-1');

    expect(prisma.task.findFirst.mock.calls[0][0].where).toEqual({
      OR: [{ slug: 'TASK-1' }, { key: 'TASK-1' }],
    });
  });

  it('deletes by id after finding the task', async () => {
    prisma.task.findFirst.mockResolvedValue(row({ id: 5 }));

    await expect(service.remove('TASK-1')).resolves.toEqual({ success: true });
    expect(prisma.task.delete).toHaveBeenCalledWith({ where: { id: 5 } });
  });
});
