export declare class CreateTaskDto {
    space?: string;
    workType?: string;
    status?: string;
    summary: string;
    description?: string;
    assignee?: string;
    reporter?: string;
    priority?: string;
    labels?: string;
    dueDate?: string;
    startDate?: string;
    category?: string;
    team?: string;
    subtasks?: unknown[];
}
export declare class UpdateTaskDto {
    space?: string;
    workType?: string;
    status?: string;
    summary?: string;
    description?: string;
    assignee?: string;
    reporter?: string;
    priority?: string;
    labels?: string;
    dueDate?: string;
    startDate?: string;
    category?: string;
    team?: string;
    subtasks?: unknown[];
}
export declare class DeleteTaskDto {
    key: string;
}
