import {
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  space?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  workType?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  status?: string;

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  summary!: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  assignee?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  reporter?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  priority?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  labels?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  dueDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  startDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  category?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  team?: string;

  @IsOptional()
  @IsArray()
  subtasks?: unknown[];
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  space?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  workType?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  status?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  summary?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  assignee?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  reporter?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  priority?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  labels?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  dueDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  startDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  category?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  team?: string;

  @IsOptional()
  @IsArray()
  subtasks?: unknown[];
}

export class DeleteTaskDto {
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  key!: string;
}
