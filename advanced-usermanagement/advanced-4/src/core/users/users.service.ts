import { Injectable } from '@nestjs/common';
import { UserRepository } from '../database/user.repository';
import { PasswordHash } from '../../utils/secure/passwordHash';
import { CreateUsersInput } from './inputs/createUsers.input';
import { UpdateUsersInput } from './inputs/updateUsers.input';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHash: PasswordHash,
  ) {}
  async signup(createUsersInput: CreateUsersInput) {
    const { password, salt } = await this.passwordHash.hash(
      createUsersInput.password,
    );
    return await this.userRepository.signup({
      ...createUsersInput,
      password,
      salt,
    });
  }

  async update(nickname: string, updateUsersInput: UpdateUsersInput) {
    let updatePassword: string, updateSalt: string;
    if (updateUsersInput.password) {
      const { password, salt } = await this.passwordHash.hash(
        updateUsersInput.password,
      );
      updatePassword = password;
      updateSalt = salt;
    }

    return await this.userRepository.updateOne(nickname, {
      fullName: updateUsersInput.fullName,
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
}
