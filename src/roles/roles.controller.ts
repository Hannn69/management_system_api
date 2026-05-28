import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  async createRole(
    @Body() data: { name: string; description?: string },
  ) {
    return this.rolesService.createRole(data);
  }

  @Get()
  async getAllRoles() {
    return this.rolesService.getAllRoles();
  }

  @Get(':id')
  async getRole(@Param('id') id: string) {
    return this.rolesService.getRole(parseInt(id));
  }

  @Patch(':id')
  async updateRole(
    @Param('id') id: string,
    @Body() data: { name?: string; description?: string },
  ) {
    return this.rolesService.updateRole(parseInt(id), data);
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: string) {
    return this.rolesService.deleteRole(parseInt(id));
  }

  @Get(':id/permissions')
  async getRolePermissions(@Param('id') id: string) {
    return this.rolesService.getRolePermissions(parseInt(id));
  }

  @Patch(':roleId/permissions/:permissionId')
  async updateRolePermission(
    @Param('roleId') roleId: string,
    @Param('permissionId') permissionId: string,
    @Body() data: { create?: boolean; read?: boolean; update?: boolean; delete?: boolean },
  ) {
    return this.rolesService.updateRolePermission(
      parseInt(roleId),
      parseInt(permissionId),
      data,
    );
  }
}
