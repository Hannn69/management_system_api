import { SettingRecord } from '@prisma/client';
import { SettingsBaseService } from '../common/settings-base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
export declare class AssetModelsService extends SettingsBaseService<SettingRecord, CreateSettingDto, UpdateSettingDto> {
    constructor(prisma: PrismaService);
}
