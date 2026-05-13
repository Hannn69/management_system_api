import {
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IBaseService } from './interfaces/base-service.interface';

@UseGuards(AuthGuard('jwt'))
export abstract class BaseController<T, CreateDto, UpdateDto> {
  constructor(protected readonly service: IBaseService<T, CreateDto, UpdateDto>) {}

  @Get()
  async findAll() {
    const records = await this.service.findAll();
    return { records };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const record = await this.service.findOne(id);
    return { record };
  }

  @Post()
  async create(@Body() body: CreateDto, @Req() req: Request) {
    const user = req.user as { id: number } | undefined;
    if (!user?.id) {
      throw new UnauthorizedException();
    }
    const record = await this.service.create(body, user.id);
    return { record };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateDto,
    @Req() req: Request,
  ) {
    const user = req.user as { id: number } | undefined;
    if (!user?.id) {
      throw new UnauthorizedException();
    }
    const record = await this.service.update(id, body, user.id);
    return { record };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = req.user as { id: number } | undefined;
    if (!user?.id) {
      throw new UnauthorizedException();
    }
    return this.service.remove(id, user.id);
  }
}
