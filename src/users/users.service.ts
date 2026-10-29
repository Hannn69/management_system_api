import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { BaseService, BaseQuery } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { assertNotInUse } from '../common/in-use';

/** Body accepted by the user endpoints. Only these fields are ever written. */
export interface UserInput {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string | null;
  lastName?: string | null;
  displayName?: string | null;
  phoneNumber?: string | null;
  loginEnabled?: boolean;
  companyId?: number | string | null;
  locationId?: number | string | null;
}

@Injectable()
export class UsersService extends BaseService<User, any, any> {
  constructor(prisma: PrismaService) {
    super(prisma, 'user');
  }

  async findAll(query: BaseQuery = {}) {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 10);
    const search = query.search || '';
    const sort = query.sort || 'createdAt';
    const order = query.order || 'desc';

    const where: Prisma.UserWhereInput = search
      ? {
          OR: [
            { email: { contains: search } },
            { username: { contains: search } },
            { firstName: { contains: search } },
            { lastName: { contains: search } },
            { displayName: { contains: search } },
          ],
        }
      : {};

    const [records, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        include: {
          company: true,
          location: true,
        },
        orderBy: { [sort as any]: order },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.user.count({ where }),
    ]);

    return { records, total };
  }

  private readonly include = { company: true, location: true };

  // Only these fields may be written through the API; anything else in the body is ignored.
  private pickUserFields(data: UserInput) {
    const text = (v?: string | null) =>
      v === undefined ? undefined : (v ?? '').trim() || null;
    const id = (v?: number | string | null) =>
      v === undefined ? undefined : v === null || v === '' ? null : Number(v);
    return {
      email: data.email === undefined ? undefined : String(data.email).trim(),
      username:
        data.username === undefined ? undefined : String(data.username).trim(),
      firstName: text(data.firstName),
      lastName: text(data.lastName),
      displayName: text(data.displayName),
      phoneNumber: text(data.phoneNumber),
      loginEnabled:
        data.loginEnabled === undefined ? undefined : !!data.loginEnabled,
      companyId: id(data.companyId),
      locationId: id(data.locationId),
    };
  }

  private async assertUnique(
    email?: string,
    username?: string,
    selfId?: number,
  ) {
    if (email) {
      const found = await this.prisma.user.findUnique({ where: { email } });
      if (found && found.id !== selfId) {
        throw new BadRequestException('Email already in use');
      }
    }
    if (username) {
      const found = await this.prisma.user.findUnique({ where: { username } });
      if (found && found.id !== selfId) {
        throw new BadRequestException('Username already in use');
      }
    }
  }

  async findOneWithRelations(idOrSlug: string): Promise<User> {
    const where = /^\d+$/.test(idOrSlug)
      ? { id: Number(idOrSlug) }
      : { slug: idOrSlug };
    const record = await this.prisma.user.findFirst({
      where,
      include: this.include,
    });
    if (!record) throw new NotFoundException('User not found');
    return record;
  }

  async create(data: UserInput, userId: number): Promise<User> {
    const { password, confirmPassword } = data;

    if (!data.email || !data.username || !password) {
      throw new BadRequestException(
        'Email, username, and password are required',
      );
    }
    if (String(password).length < 8) {
      throw new BadRequestException('Password must be at least 8 characters');
    }
    if (confirmPassword !== undefined && password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const fields = this.pickUserFields(data);
    await this.assertUnique(fields.email, fields.username);

    const passwordHash = await bcrypt.hash(String(password), 12);

    return super.create({ ...fields, passwordHash }, userId);
  }

  async updateUser(idOrSlug: string, data: UserInput): Promise<User> {
    const existing = await this.findOneWithRelations(idOrSlug);
    const fields = this.pickUserFields(data);
    await this.assertUnique(fields.email, fields.username, existing.id);

    const changes: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) changes[key] = value;
    }

    if (data.password) {
      if (String(data.password).length < 8) {
        throw new BadRequestException('Password must be at least 8 characters');
      }
      changes.passwordHash = await bcrypt.hash(String(data.password), 12);
      // Force re-login everywhere after a password change.
      changes.refreshTokenHash = null;
      changes.refreshTokenExpiresAt = null;
    }

    return this.prisma.user.update({
      where: { id: existing.id },
      data: changes,
      include: this.include,
    });
  }

  async removeUser(id: number, actingUserId: number) {
    if (id === actingUserId) {
      throw new BadRequestException('You cannot delete your own account');
    }
    const existing = await this.findOne(id);
    await assertNotInUse(
      this.prisma,
      'user',
      id,
      existing.displayName ?? existing.email,
    );
    await this.prisma.user.delete({ where: { id } });
    return { success: true };
  }
}
