import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { PermissionsService } from '../permissions/permissions.service';
import { RoleNameExists } from './decorators';

@Module({
  providers: [RolesService, PermissionsService, RoleNameExists],
  exports: [RolesService],
})
export class RolesModule {}
