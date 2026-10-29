import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, TaskQuery, UpdateTaskDto } from './dto/tasks.dto';

const SORTABLE = [
  'updatedAt',
  'createdAt',
  'priority',
  'status',
  'summary',
  'key',
];
const MAX_PAGE_SIZE = 100;
const KEY_ATTEMPTS = 3;

/** `2026-11-01` for a date, `''` for none: the shape `<input type="date">` expects. */
const formatDate = (value: Date | null) =>
  value ? value.toISOString().slice(0, 10) : '';

/** Empty string clears the date; an unparseable value is a client error. */
function parseDate(value: string | undefined, field: string) {
  if (value === undefined) return undefined;
  if (value === '') return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new BadRequestException(`${field} is not a valid date`);
  }
  return date;
}

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  private serialize(task: Task) {
    return {
      ...task,
      dueDate: formatDate(task.dueDate),
      startDate: formatDate(task.startDate),
      subtasks: task.subtasks ?? [],
    };
  }

  async findAll(query: TaskQuery) {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.min(
      Math.max(Number(query.limit) || 10, 1),
      MAX_PAGE_SIZE,
    );
    const sort = SORTABLE.includes(query.sort ?? '')
      ? query.sort!
      : 'updatedAt';
    const order = query.order === 'asc' ? 'asc' : 'desc';

    const where: Prisma.TaskWhereInput = {};
    if (query.status && query.status !== 'All') where.status = query.status;
    if (query.space) where.space = { contains: query.space };
    if (query.search?.trim()) {
      const search = query.search.trim();
      where.OR = [
        { key: { contains: search } },
        { summary: { contains: search } },
        { description: { contains: search } },
        { assignee: { contains: search } },
      ];
    }

    const [tasks, total] = await Promise.all([
      this.prisma.task.findMany({
        where,
        orderBy: { [sort]: order },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.task.count({ where }),
    ]);

    return { tasks: tasks.map((t) => this.serialize(t)), total };
  }

  private async load(keyOrSlug: string) {
    const task = await this.prisma.task.findFirst({
      where: { OR: [{ slug: keyOrSlug }, { key: keyOrSlug }] },
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async findOne(keyOrSlug: string) {
    return this.serialize(await this.load(keyOrSlug));
  }

  /** Next key for a space like "task (TASK)" is TASK-<highest number so far + 1>. */
  private async nextKey(space: string | undefined) {
    const prefix =
      /\(([A-Za-z0-9]+)\)/.exec(space ?? '')?.[1]?.toUpperCase() ?? 'TASK';
    const existing = await this.prisma.task.findMany({
      where: { key: { startsWith: `${prefix}-` } },
      select: { key: true },
    });
    const highest = existing.reduce((max, { key }) => {
      const n = Number(key.slice(prefix.length + 1));
      return Number.isFinite(n) ? Math.max(max, n) : max;
    }, 0);
    return `${prefix}-${highest + 1}`;
  }

  async create(dto: CreateTaskDto, userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const { dueDate, startDate, subtasks, ...fields } = dto;
    const data = {
      ...fields,
      reporter:
        fields.reporter?.trim() ||
        user?.displayName ||
        user?.username ||
        user?.email,
      dueDate: parseDate(dueDate, 'dueDate'),
      startDate: parseDate(startDate, 'startDate'),
      subtasks: subtasks as Prisma.InputJsonValue | undefined,
      userId,
      createdBy: userId,
      updatedBy: userId,
    };

    // Two creates can pick the same number at once; the unique key rejects one, so retry.
    for (let attempt = 1; ; attempt++) {
      try {
        const task = await this.prisma.task.create({
          data: { ...data, key: await this.nextKey(dto.space) },
        });
        return this.serialize(task);
      } catch (error) {
        const clash =
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === 'P2002';
        if (!clash || attempt >= KEY_ATTEMPTS) throw error;
      }
    }
  }

  async update(keyOrSlug: string, dto: UpdateTaskDto, userId: number) {
    const existing = await this.load(keyOrSlug);
    const { dueDate, startDate, subtasks, ...fields } = dto;

    const task = await this.prisma.task.update({
      where: { id: existing.id },
      data: {
        ...fields,
        dueDate: parseDate(dueDate, 'dueDate'),
        startDate: parseDate(startDate, 'startDate'),
        subtasks: subtasks as Prisma.InputJsonValue | undefined,
        updatedBy: userId,
      },
    });
    return this.serialize(task);
  }

  async remove(keyOrSlug: string) {
    const existing = await this.load(keyOrSlug);
    await this.prisma.task.delete({ where: { id: existing.id } });
    return { success: true };
  }
}
