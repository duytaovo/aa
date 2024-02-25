import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dtos';

@Injectable()
export class RolesService {
  constructor(private readonly prismaService: PrismaService) {}

  findByName(name: string) {
    return this.prismaService.role.findUnique({ where: { name } });
  }

  findById(id: number) {
    return this.prismaService.role.findUnique({ where: { id } });
  }
}
