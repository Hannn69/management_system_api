import { UsersService } from './users.service';
import { Request } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(query: any): Promise<{
        records: any;
        total: any;
    }>;
    create(body: any, req: Request): Promise<$Result.DefaultSelection<import(".prisma/client").Prisma.$UserPayload<$Extensions.DefaultArgs>>>;
}
