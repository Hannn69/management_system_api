import { SettingKind } from '@prisma/client';
import { BaseService } from './base.service';
import { PrismaService } from '../prisma/prisma.service';
export declare abstract class SettingsBaseService<T, CreateDto, UpdateDto> extends BaseService<T, CreateDto, UpdateDto> {
    protected readonly prisma: PrismaService;
    protected readonly kind: SettingKind;
    constructor(prisma: PrismaService, kind: SettingKind);
    findAll(): Promise<T[]>;
    findOne(id: number): Promise<T>;
    create(data: any, userId: number): Promise<T>;
    update(id: number, data: any, userId: number): Promise<T>;
    remove(id: number, userId: number): Promise<{
        success: boolean;
    }>;
}
