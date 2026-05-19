import { Controller } from '@nestjs/common';
import { StatusLabel } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
import { StatusLabelsService } from './status-labels.service';

@Controller('status-labels')
export class StatusLabelsController extends BaseController<
  StatusLabel,
  CreateSettingDto,
  UpdateSettingDto
> {
  constructor(private readonly statusLabelsService: StatusLabelsService) {
    super(statusLabelsService);
  }
}
