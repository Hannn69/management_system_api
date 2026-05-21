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
                email: string | null;
                createdAt: Date;
                updatedAt: Date;
                phone: string | null;
                fax: string | null;
                logo: string | null;
                notes: string | null;
            } | null;
            location: {
                name: string;
                id: number;
                slug: string;
                companyId: number | null;
                createdAt: Date;
                updatedAt: Date;
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
            createdAt: Date;
            updatedAt: Date;
        })[];
        total: number;
    }>;
    create(data: any, userId: number): Promise<User>;
}
