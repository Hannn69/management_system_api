import { Category } from '@prisma/client';
import { BaseService, BaseQuery } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../common/dto/entity.dto';
export declare class CategoriesService extends BaseService<Category, CreateCategoryDto, UpdateCategoryDto> {
    protected readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    findAll(query?: BaseQuery): Promise<{
        records: any;
        total: any;
    }>;
    create(data: CreateCategoryDto, userId: number): Promise<Category>;
}
