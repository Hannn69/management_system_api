import { User } from '@prisma/client';
import { BaseService, BaseQuery } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService extends BaseService<User, any, any> {
    constructor(prisma: PrismaService);
    findAll(query?: BaseQuery): Promise<{
        records: any;
        total: any;
    }>;
    create(data: any, userId: number): Promise<User>;
}
