import { UsersService } from './users.service';
import { Request } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(query: any): Promise<{
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
    create(body: any, req: Request): Promise<{
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
    }>;
}
