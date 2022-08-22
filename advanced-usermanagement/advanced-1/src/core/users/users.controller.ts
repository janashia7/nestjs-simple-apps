import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdateGuard } from './guards/update.guard';
import { UpdateInterceptor } from '../interceptor/update.interceptor';
import { Role } from '../database/constants/enum';
import { Roles } from '../auth/roles/roles.decorator';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() userDto: CreateUserDto) {
    try {
      return await this.usersService.signup(userDto);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Request() req) {
    try {
      return req.user;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.FORBIDDEN);
    }
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard, UpdateGuard)
  @UseInterceptors(UpdateInterceptor)
  @Put('update/:nickname')
  async update(
    @Body() userDto: UpdateUserDto,
    @Param('nickname') nickname: string,
  ) {
    try {
      await this.usersService.update(nickname, userDto);
      return { message: `${nickname}'s profile has been updated` };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('delete/:nickname')
  async delete(@Param('nickname') nickname: string) {
    try {
      return this.usersService.delete(nickname);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.FORBIDDEN);
    }
  }

  @Get('list')
  async getList(@Query() { page, limit }) {
    try {
      return await this.usersService.getList(page, limit);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.FORBIDDEN);
    }
  }
}
