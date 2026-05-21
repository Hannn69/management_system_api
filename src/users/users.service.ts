import { Injectable, BadRequestException } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { BaseService, BaseQuery } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

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

  async create(data: any, userId: number): Promise<User> {
    const { password, confirmPassword, ...userData } = data;

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const existingEmail = await this.prisma.user.findUnique({
      where: { email: userData.email },
    });
    if (existingEmail) {
      throw new BadRequestException('Email already in use');
    }

    const existingUsername = await this.prisma.user.findUnique({
      where: { username: userData.username },
    });
    if (existingUsername) {
      throw new BadRequestException('Username already in use');
    }

    const passwordHash = await bcrypt.hash(password, 12);

    return super.create(
      {
        ...userData,
        passwordHash,
      },
      userId
    );
  }
}
