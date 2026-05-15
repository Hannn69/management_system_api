import { Body, Controller, Get, Param, Patch, Post, Query, Req, UnauthorizedException } from '@nestjs/common';
import { Asset } from '@prisma/client';
import { Request } from 'express';
import { BaseController } from '../common/base.controller';
import { CreateAssetDto, UpdateAssetDto } from './dto/assets.dto';
import { AssetsService } from './assets.service';

@Controller('assets')
export class AssetsController extends BaseController<Asset, CreateAssetDto, UpdateAssetDto> {
  constructor(private readonly assetsService: AssetsService) {
    super(assetsService);
  }

  @Get()
  override async findAll(@Query() query: any) {
    return this.assetsService.findAll(query);
  }

  @Get(':idOrSlug')
  override async findOne(@Param('idOrSlug') idOrSlug: string) {
    const record = await this.assetsService.findOne(idOrSlug);
    return { record };
  }

  @Patch(':idOrSlug')
  override async update(
    @Param('idOrSlug') idOrSlug: string,
    @Body() body: UpdateAssetDto,
    @Req() req: Request,
  ) {
    const user = req.user as { id: number } | undefined;
    if (!user?.id) {
      throw new UnauthorizedException();
    }
    const record = await this.assetsService.update(idOrSlug, body, user.id);
    return { record };
  }
}
