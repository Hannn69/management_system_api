import { Category } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateCategoryDto, UpdateCategoryDto } from '../common/dto/entity.dto';
import { CategoriesService } from './categories.service';
export declare class CategoriesController extends BaseController<Category, CreateCategoryDto, UpdateCategoryDto> {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(query: any): Promise<{
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
}
