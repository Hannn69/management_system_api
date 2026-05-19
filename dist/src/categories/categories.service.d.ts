import { Category } from '@prisma/client';
import { BaseService, BaseQuery } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../common/dto/entity.dto';
export declare class CategoriesService extends BaseService<Category, CreateCategoryDto, UpdateCategoryDto> {
    protected readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    findAll(query?: BaseQuery): Promise<{
        records: {
            qty: number;
            sendEmail: boolean;
            acceptance: boolean;
            _count: {
                assetModels: number;
            };
            name: string;
            id: number;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            notes: string | null;
            image: string | null;
            type: string;
            eula: string | null;
            useDefaultEula: boolean;
            requireConfirmation: boolean;
            emailNotification: boolean;
        }[];
        total: number;
    }>;
    create(data: CreateCategoryDto, userId: number): Promise<Category>;
}
