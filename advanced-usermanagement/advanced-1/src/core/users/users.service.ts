import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserRepository } from '../database/user.repository';
import { PasswordHash } from '../../utils/secure/passwordHash';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHash: PasswordHash,
  ) {}
  async signup(userDto: CreateUserDto) {
    const { password, salt } = await this.passwordHash.hash(userDto.password);
    return await this.userRepository.signup({ ...userDto, password, salt });
  }

  async update(nickname: string, userDto: UpdateUserDto) {
    let updatePassword: string, updateSalt: string;
    if (userDto.password) {
      const { password, salt } = await this.passwordHash.hash(userDto.password);
      updatePassword = password;
      updateSalt = salt;
    }

    return await this.userRepository.updateOne(nickname, {
      fullName: userDto.fullName,
      password: updatePassword,
      salt: updateSalt,
    });
  }

  async delete(nickname: string) {
    return this.userRepository.delete(nickname);
  }

  async findOne(nickname: string) {
    return await this.userRepository.findOne(nickname);
  }

  async getList(page: number, limit: number) {
    return await this.userRepository.getList(page, limit);
  }

  async addAvatar(nickname: string, url: string) {
    return this.userRepository.addAvatar(nickname, url);
  }
}
