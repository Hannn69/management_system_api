import { Manufacturer } from '@prisma/client';
import { BaseController } from '../common/base.controller';
import { CreateManufacturerDto, UpdateManufacturerDto } from '../common/dto/entity.dto';
import { ManufacturersService } from './manufacturers.service';
export declare class ManufacturersController extends BaseController<Manufacturer, CreateManufacturerDto, UpdateManufacturerDto> {
    private readonly manufacturersService;
    constructor(manufacturersService: ManufacturersService);
}
