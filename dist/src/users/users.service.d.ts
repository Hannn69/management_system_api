import { User } from '@prisma/client';
import { BaseService, BaseQuery } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService extends BaseService<User, any, any> {
    constructor(prisma: PrismaService);
    findAll(query?: BaseQuery): Promise<{
        records: ({
            company: {
                name: string;
                id: number;
                slug: string;
                createdAt: Date;
                updatedAt: Date;
                email: string | null;
                phone: string | null;
                fax: string | null;
                logo: string | null;
                notes: string | null;
            } | null;
            location: {
                name: string;
                id: number;
                slug: string;
                createdAt: Date;
                updatedAt: Date;
                companyId: number | null;
                phone: string | null;
                fax: string | null;
                notes: string | null;
                parentId: number | null;
                managerId: number | null;
                currency: string | null;
                address: string | null;
                address2: string | null;
                city: string | null;
                state: string | null;
                country: string | null;
                zip: string | null;
                image: string | null;
            } | null;
        } & {
            id: number;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            roleId: number | null;
            email: string;
            username: string;
            passwordHash: string;
            firstName: string | null;
            lastName: string | null;
            displayName: string | null;
            loginEnabled: boolean;
            companyId: number | null;
            locationId: number | null;
            refreshTokenHash: string | null;
            refreshTokenExpiresAt: Date | null;
        })[];
        total: number;
    }>;
    create(data: any, userId: number): Promise<User>;
}
