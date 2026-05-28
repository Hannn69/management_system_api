import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ModulesService } from './modules.service';

@Controller('modules')
export class ModulesController {
  constructor(private modulesService: ModulesService) {}

  @Post()
  async createModule(
    @Body() data: { name: string; label: string; description?: string },
  ) {
    return this.modulesService.createModule(data);
  }

  @Get()
  async getAllModules() {
    return this.modulesService.getAllModules();
  }

  @Get(':id')
  async getModule(@Param('id') id: string) {
    return this.modulesService.getModule(parseInt(id));
  }

  @Patch(':id')
  async updateModule(
    @Param('id') id: string,
    @Body() data: { name?: string; label?: string; description?: string },
  ) {
    return this.modulesService.updateModule(parseInt(id), data);
  }

  @Delete(':id')
  async deleteModule(@Param('id') id: string) {
    return this.modulesService.deleteModule(parseInt(id));
  }
}
