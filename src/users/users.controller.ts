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
import { BaseQuery } from '../common/base.service';
import { UserInput, UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() query: BaseQuery) {
    return this.usersService.findAll(query);
  }

  @Get(':idOrSlug')
  async findOne(@Param('idOrSlug') idOrSlug: string) {
    const record = await this.usersService.findOneWithRelations(idOrSlug);
    return { record };
  }

  @Post()
  async create(@Body() body: UserInput, @Req() req: Request) {
    const user = req.user as { id: number };
    const record = await this.usersService.create(body, user.id);
    return { record };
  }

  @Patch(':idOrSlug')
  async update(@Param('idOrSlug') idOrSlug: string, @Body() body: UserInput) {
    const record = await this.usersService.updateUser(idOrSlug, body);
    return { record };
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as { id: number };
    return this.usersService.removeUser(Number(id), user.id);
  }
}
