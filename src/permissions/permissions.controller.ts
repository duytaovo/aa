import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PermissionsService } from './permissions.service';
import {
  Body,
  Controller,
  Delete,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PermissionDto } from './dtos';
import { ActionName, EntityName } from '../enums';
import { JwtGuard, PermissionGuard } from '../guards';
import { Permission } from '../decorators';

@ApiBearerAuth()
@ApiTags('Permissions')
@UseGuards(JwtGuard)
@Controller({
  path: 'permissions',
  version: '1',
})
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @UseGuards(PermissionGuard)
  @Permission({
    entityName: EntityName.PERMISSION,
    actionName: ActionName.CREATE,
  })
  @Post()
  async grantPermission(@Body() dto: PermissionDto) {
    const permission = await this.permissionsService.grantPermission(dto);
    return {
      code: HttpStatus.OK,
      result: { permission },
    };
  }

  @UseGuards(PermissionGuard)
  @Permission({
    entityName: EntityName.PERMISSION,
    actionName: ActionName.DELETE,
  })
  @Delete()
  async denyPermission(@Body() dto: PermissionDto) {
    const permission = await this.permissionsService.denyPermission(dto);
    return { code: HttpStatus.OK, result: { permission } };
  }
}
