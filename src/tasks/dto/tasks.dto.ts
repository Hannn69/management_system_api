import { Transform } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

class TaskFieldsDto {
  @IsString()
  @IsOptional()
  @MaxLength(191)
  space?: string;

  @IsString()
  @IsOptional()
  @MaxLength(191)
  workType?: string;

  @IsString()
  @IsOptional()
  @MaxLength(191)
  status?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @MaxLength(191)
  assignee?: string;

  @IsString()
  @IsOptional()
  @MaxLength(191)
  reporter?: string;

  @IsString()
  @IsOptional()
  @MaxLength(191)
  priority?: string;

  @IsString()
  @IsOptional()
  @MaxLength(191)
  labels?: string;

  /** `YYYY-MM-DD`, or an empty string to clear it. */
  @IsString()
  @IsOptional()
  dueDate?: string;

  /** `YYYY-MM-DD`, or an empty string to clear it. */
  @IsString()
  @IsOptional()
  startDate?: string;

  @IsString()
  @IsOptional()
  @MaxLength(191)
  category?: string;

  @IsString()
  @IsOptional()
  @MaxLength(191)
  team?: string;

  // Passed through as sent: implicit type conversion would otherwise rewrite the elements.
  @Transform(({ obj }: { obj: { subtasks?: unknown[] } }) => obj.subtasks)
  @IsArray()
  @IsOptional()
  subtasks?: unknown[];
}

export class CreateTaskDto extends TaskFieldsDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(191)
  summary!: string;
}

export class UpdateTaskDto extends TaskFieldsDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(191)
  summary?: string;
}

export interface TaskQuery {
  page?: string | number;
  limit?: string | number;
  sort?: string;
  order?: string;
  search?: string;
  status?: string;
  space?: string;
}
