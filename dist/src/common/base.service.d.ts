import { PrismaService } from '../prisma/prisma.service';
export declare abstract class BaseService<T, CreateDto, UpdateDto> {
    protected readonly prisma: PrismaService;
    protected readonly modelName: string;
    constructor(prisma: PrismaService, modelName: string);
    findAll(where?: any): Promise<T[]>;
    findOne(id: number, where?: any): Promise<T>;
    create(data: CreateDto, userId: number, extra?: any): Promise<T>;
    update(id: number, data: UpdateDto, userId: number, where?: any): Promise<T>;
    remove(id: number, userId: number, where?: any): Promise<{
        success: boolean;
    }>;
}
