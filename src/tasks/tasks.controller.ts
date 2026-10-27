import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateTaskDto, TaskQuery, UpdateTaskDto } from './dto/tasks.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@Query() query: TaskQuery) {
    return this.tasksService.findAll(query);
  }

  @Get(':keyOrSlug')
  async findOne(@Param('keyOrSlug') keyOrSlug: string) {
    return { task: await this.tasksService.findOne(keyOrSlug) };
  }

  @Post()
  async create(@Body() body: CreateTaskDto, @Req() req: Request) {
    const user = req.user as { id: number };
    return { task: await this.tasksService.create(body, user.id) };
  }

  @Patch(':keyOrSlug')
  async update(
    @Param('keyOrSlug') keyOrSlug: string,
    @Body() body: UpdateTaskDto,
    @Req() req: Request,
  ) {
    const user = req.user as { id: number };
    return { task: await this.tasksService.update(keyOrSlug, body, user.id) };
  }

  @Delete(':keyOrSlug')
  remove(@Param('keyOrSlug') keyOrSlug: string) {
    return this.tasksService.remove(keyOrSlug);
  }
}
