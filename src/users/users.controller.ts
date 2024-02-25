import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateMeDto, UpdateUserDto, UserDto } from './dtos';
import { Serialize } from '../interceptors';
import { PermissionGuard, JwtGuard, OwnershipGuard } from '../guards';
import { CurrentUser } from './decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from './dtos/pagination.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { User } from '@prisma/client';
import { UserIdNotExistsPipe } from './pipes';
import { Permission } from '../decorators';
import { ActionName, EntityName } from '../enums';

@ApiBearerAuth()
@ApiTags('User')
@UseGuards(JwtGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Serialize(UserDto, (data) => data.result.user)
  @Get('/me')
  getMe(@CurrentUser() user: User) {
    return { code: HttpStatus.OK, result: { user } };
  }

  @Serialize(UserDto, (data) => data.result.user)
  @UseInterceptors(CacheInterceptor)
  @UseGuards(PermissionGuard)
  @Permission({ entityName: EntityName.USER, actionName: ActionName.READ })
  @Get('/:id')
  async findUser(@Param('id', ParseIntPipe, UserIdNotExistsPipe) id: number) {
    const user = await this.usersService.findById(id);
    return { code: HttpStatus.OK, result: { user } };
  }

  @Serialize(UserDto, (data) => data.result.user)
  @UseGuards(PermissionGuard)
  @Permission({ entityName: EntityName.USER, actionName: ActionName.CREATE })
  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    const user = await this.usersService.create(dto);
    return { code: HttpStatus.OK, result: { user } };
  }
}
