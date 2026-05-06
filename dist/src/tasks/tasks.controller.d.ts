import type { Request } from 'express';
import { TasksService } from './tasks.service';
import { CreateTaskDto, DeleteTaskDto, UpdateTaskDto } from './dto/tasks.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(body: CreateTaskDto, req: Request): Promise<{
        message: string;
    }>;
    update(key: string, body: UpdateTaskDto, req: Request): Promise<{
        message: string;
    }>;
    remove(body: DeleteTaskDto): Promise<{
        message: string;
    }>;
    list(pageParam?: string, limitParam?: string, sortParam?: string, orderParam?: string, searchParam?: string, statusParam?: string, spaceParam?: string, req?: Request): Promise<{
        tasks: {
            id: number;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            space: string | null;
            key: string;
            workType: string | null;
            status: string;
            summary: string;
            description: string | null;
            assignee: string | null;
            reporter: string | null;
            priority: string | null;
            labels: string | null;
            dueDate: Date | null;
            startDate: Date | null;
            category: string | null;
            team: string | null;
            subtasks: import("@prisma/client/runtime/library").JsonValue | null;
            userId: number;
            createdBy: number;
            updatedBy: number;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    detail(slug: string): Promise<{
        task: {
            id: number;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            space: string | null;
            key: string;
            workType: string | null;
            status: string;
            summary: string;
            description: string | null;
            assignee: string | null;
            reporter: string | null;
            priority: string | null;
            labels: string | null;
            dueDate: Date | null;
            startDate: Date | null;
            category: string | null;
            team: string | null;
            subtasks: import("@prisma/client/runtime/library").JsonValue | null;
            userId: number;
            createdBy: number;
            updatedBy: number;
        } | null;
    }>;
}
