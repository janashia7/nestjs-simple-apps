import {
  HttpException,
  HttpStatus,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdateGuard } from './guards/update.guard';
import { UpdateInterceptor } from '../interceptor/update.interceptor';
import { RolesEnum } from '../database/constants/rolesEnum';
import { Roles } from '../auth/roles/roles.decorator';
import { UsersService } from './users.service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from './models/users.entity';
import { CreateUsersInput } from './inputs/createUsers.input';
import { UsersToken } from './models/login.type';
import { LoginUsersInput } from './inputs/loginUsers.input';
import { GqlLocalAuthGuard } from '../auth/guards/glq-local.guard';
import { GqlAuthGuard } from '../auth/guards/glq-jwt.guard';
import { UpdateUsersInput } from './inputs/updateUsers.input';
import { UpdateUserMsg } from './models/update.type';
import { DeleteType } from './models/delete.type';
import { User } from '../database/schema/user.schema';

@Resolver('users')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => UserEntity)
  async signup(
    @Args('createUsersInput') createUsersInput: CreateUsersInput,
  ): Promise<User> {
    try {
      return await this.usersService.signup(createUsersInput);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => UsersToken, { nullable: true })
  @UseGuards(GqlLocalAuthGuard)
  async signin(
    @Args('loginUserInput') loginUserInput: LoginUsersInput,
  ): Promise<{ token: string }> {
    try {
      return this.authService.login(loginUserInput);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.FORBIDDEN);
    }
  }

  @Mutation(() => UpdateUserMsg)
  @Roles(RolesEnum.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard, UpdateGuard)
  @UseInterceptors(UpdateInterceptor)
  async update(
    @Args('nickname') nickname: string,
    @Args('updateUsersInput')
    updateUsersInput: UpdateUsersInput,
  ): Promise<{ message: string }> {
    try {
      await this.usersService.update(nickname, updateUsersInput);
      return { message: `${nickname}'s profile has been updated` };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => DeleteType)
  @Roles(RolesEnum.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async delete(
    @Args('nickname') nickname: string,
  ): Promise<{ deleted: number }> {
    try {
      return this.usersService.delete(nickname);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.FORBIDDEN);
    }
  }

  @Query(() => [UserEntity])
  async getList(
    @Args('page', { nullable: true }) page: number,
    @Args('limit', { nullable: true }) limit: number,
  ): Promise<UserEntity[]> {
    try {
      return await this.usersService.getList(page || 1, limit || 5);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.FORBIDDEN);
    }
  }
}
