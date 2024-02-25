import { Injectable } from '@nestjs/common';
import { CreateUserDto, PaginationDto } from './dtos';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminDto } from './dtos';
import { User } from '@prisma/client';
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

  findAllUsers(paginationDto: PaginationDto): Promise<User[]> {
    const { page, pageSize } = paginationDto;
    return this.prismaService.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async update(id: number, attrs: Partial<User>): Promise<User> {
    if ('password' in attrs)
      attrs.password = await bcrypt.hash(attrs.password, 10);
    const user = await this.prismaService.user.update({
      where: { id },
      data: { ...attrs },
    });
    return user;
  }

  async remove(id: number): Promise<User> {
    return this.prismaService.user.delete({ where: { id } });
  }
}
