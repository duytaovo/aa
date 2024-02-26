import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminDto } from './dtos';
import { Role } from '../enums';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateUserDto) {
    const hashedPassword: string = await bcrypt.hash(dto.password, 10);
    return this.prismaService.user.create({
      data: { email: dto.email, password: hashedPassword },
    });
  }

  async createAdmin(dto: CreateAdminDto) {
    const hashedPassword: string = await bcrypt.hash(dto.password, 10);
    return this.prismaService.user.create({
      data: { email: dto.email, password: hashedPassword, roleId: Role.ADMIN },
    });
  }

  findById(id: number) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  findFirstAdmin() {
    return this.prismaService.user.findFirst({
      where: { roleId: Role.ADMIN },
    });
  }
}
