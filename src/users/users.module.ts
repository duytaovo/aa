import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CacheModule } from '@nestjs/cache-manager';
import { UserIdNotExistsPipe } from './pipes';
import { EmailExists } from './decorators';
import { RoleIdNotExists } from '../roles/decorators';
import { RolesService } from '../roles/roles.service';
import { PermissionsService } from 'src/permissions/permissions.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [UsersController],
  providers: [
    RolesService,
    UsersService,
    UserIdNotExistsPipe,
    EmailExists,
    PermissionsService,
    RoleIdNotExists,
  ],
  exports: [UsersService],
})
export class UsersModule {}
