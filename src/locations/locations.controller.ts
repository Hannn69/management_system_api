import { Controller } from '@nestjs/common';
import { Location } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController extends BaseController<
  Location,
  CreateSettingDto,
  UpdateSettingDto
> {
  constructor(private readonly locationsService: LocationsService) {
    super(locationsService);
  }
}
