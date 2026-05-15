import { Controller, Get, Query } from '@nestjs/common';
import { Supplier } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateSupplierDto, UpdateSupplierDto } from '../common/dto/entity.dto';
import { SuppliersService } from './suppliers.service';

@Controller('suppliers')
export class SuppliersController extends BaseController<
  Supplier,
  CreateSupplierDto,
  UpdateSupplierDto
> {
  constructor(private readonly suppliersService: SuppliersService) {
    super(suppliersService);
  }

  @Get()
  override async findAll(@Query() query: any) {
    return this.suppliersService.findAll(query);
  }
}
