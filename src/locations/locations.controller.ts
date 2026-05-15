import { Controller, Get, Query } from '@nestjs/common';
import { Location } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateLocationDto, UpdateLocationDto } from '../common/dto/entity.dto';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController extends BaseController<
  Location,
  CreateLocationDto,
  UpdateLocationDto
> {
  constructor(private readonly locationsService: LocationsService) {
    super(locationsService);
  }

  @Get()
  override async findAll(@Query() query: any) {
    return this.locationsService.findAll(query);
  }
}
