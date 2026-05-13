import { Injectable } from '@nestjs/common';
import { SettingKind, SettingRecord } from '@prisma/client';
import { SettingsBaseService } from '../common/settings-base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';

@Injectable()
export class DepartmentsService extends SettingsBaseService<SettingRecord, CreateSettingDto, UpdateSettingDto> {
  constructor(prisma: PrismaService) {
    super(prisma, SettingKind.DEPARTMENT);
  }
}
