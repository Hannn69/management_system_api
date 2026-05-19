import {
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { IBaseService } from './interfaces/base-service.interface';
import { BaseQuery } from './base.service';

// @UseGuards(AuthGuard('jwt'))
export abstract class BaseController<T, CreateDto, UpdateDto> {
  constructor(
    protected readonly service: IBaseService<T, CreateDto, UpdateDto>,
  ) {}

  @Get()
  async findAll(@Query() query: BaseQuery) {
    return this.service.findAll(query);
  }

  @Get(':idOrSlug')
  async findOne(@Param('idOrSlug') idOrSlug: string) {
    const record = await this.service.findOne(idOrSlug);
    return { record };
  }

  @Post()
  async create(@Body() body: CreateDto, @Req() req: Request) {
    const user = req.user as { id: number } | undefined;
    const userId = user?.id || 1; // Default to admin for dev
    const record = await this.service.create(body, userId);
    return { record };
  }

  @Patch(':idOrSlug')
  async update(
    @Param('idOrSlug') idOrSlug: string,
    @Body() body: UpdateDto,
    @Req() req: Request,
  ) {
    const user = req.user as { id: number } | undefined;
    const userId = user?.id || 1; // Default to admin for dev
    const record = await this.service.update(idOrSlug, body, userId);
    return { record };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = req.user as { id: number } | undefined;
    const userId = user?.id || 1; // Default to admin for dev
    return this.service.remove(id, userId);
  }
}
