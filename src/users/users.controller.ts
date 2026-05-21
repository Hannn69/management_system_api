import { Controller, Get, Post, Body, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.usersService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() body: any, @Req() req: Request) {
    const user = req.user as { id: number };
    return this.usersService.create(body, user.id);
  }
}
