import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleNameExists } from './decorators';
import { PermissionsService } from 'src/permissions/permissions.service';

@Module({
  providers: [RolesService, PermissionsService, RoleNameExists],
  exports: [RolesService],
})
export class RolesModule {}
