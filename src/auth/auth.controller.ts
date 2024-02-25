import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dtos';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dtos';
import { CreateAdminDto } from '../users/dtos';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(@Body() dto: CreateUserDto) {
    const result = await this.authService.register(dto);
    return { code: HttpStatus.CREATED, message: 'Register success', result };
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() dto: LoginDto) {
    const result = await this.authService.login(dto);
    if (!result) throw new BadRequestException('Wrong credentials');
    return {
      code: HttpStatus.OK,
      message: 'Login success',
      result,
    };
  }

  @Post('register-for-admin')
  async createAdminAccount(@Body() dto: CreateAdminDto) {
    const result = await this.authService.createAdminAccount(dto);
    return { code: HttpStatus.CREATED, message: 'Register success', result };
  }
}
