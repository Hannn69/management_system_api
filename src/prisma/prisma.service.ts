import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // Secrets are left out of every query result unless a query opts back in with `omit: { field: false }`.
    super({
      omit: {
        user: {
          passwordHash: true,
          refreshTokenHash: true,
          refreshTokenExpiresAt: true,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
