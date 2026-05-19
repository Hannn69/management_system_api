import { Supplier } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateSettingDto, UpdateSettingDto } from '../common/dto/settings.dto';
import { SuppliersService } from './suppliers.service';
export declare class SuppliersController extends BaseController<Supplier, CreateSettingDto, UpdateSettingDto> {
    private readonly suppliersService;
    constructor(suppliersService: SuppliersService);
}
