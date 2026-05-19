import { Controller } from '@nestjs/common';
import { Manufacturer } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import {
  CreateManufacturerDto,
  UpdateManufacturerDto,
} from '../common/dto/entity.dto';
import { ManufacturersService } from './manufacturers.service';

@Controller('manufacturers')
export class ManufacturersController extends BaseController<
  Manufacturer,
  CreateManufacturerDto,
  UpdateManufacturerDto
> {
  constructor(private readonly manufacturersService: ManufacturersService) {
    super(manufacturersService);
  }
}
