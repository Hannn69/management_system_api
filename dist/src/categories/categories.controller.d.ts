import { Category } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateCategoryDto, UpdateCategoryDto } from '../common/dto/entity.dto';
import { CategoriesService } from './categories.service';
export declare class CategoriesController extends BaseController<Category, CreateCategoryDto, UpdateCategoryDto> {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
}
