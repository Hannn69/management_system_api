import { Controller, Get, Query } from '@nestjs/common';
import { Category } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateCategoryDto, UpdateCategoryDto } from '../common/dto/entity.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController extends BaseController<
  Category,
  CreateCategoryDto,
  UpdateCategoryDto
> {
  constructor(private readonly categoriesService: CategoriesService) {
    super(categoriesService);
  }

  @Get()
  override async findAll(@Query() query: any) {
    return this.categoriesService.findAll(query);
  }
}
