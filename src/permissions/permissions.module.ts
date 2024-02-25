import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { RoleIdNotExists } from '../roles/decorators';
import { ActionsService } from './actions.service';
import { EntitiesService } from './entities.service';
import { RolesService } from '../roles/roles.service';
import { ActionIdNotExists, EntityIdNotExists } from './decorators';

@Module({
  providers: [
    PermissionsService,
    RolesService,
    ActionsService,
    EntitiesService,
    EntityIdNotExists,
    ActionIdNotExists,
    RoleIdNotExists,
  ],
  exports: [PermissionsService],
})
export class PermissionsModule {}
