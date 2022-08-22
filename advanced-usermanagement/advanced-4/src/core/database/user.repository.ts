import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { UpdateUsersInput } from '../users/inputs/updateUsers.input';
import { CreateUsersInput } from '../users/inputs/createUsers.input';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
  ) {}

  async signup(createUsersInput: CreateUsersInput): Promise<User> {
    await this.userModel.create(createUsersInput);
    return this.userModel
      .findOne({ nickname: createUsersInput.nickname })
      .select(['nickname', 'fullName', '-_id']);
  }

  findOne(nickname: string) {
    return this.userModel.findOne({ nickname, isDeleted: false });
  }

  async updateOne(nickname: string, updateUsersInput: UpdateUsersInput) {
    return this.userModel
      .findOneAndUpdate({ nickname, isDeleted: false }, updateUsersInput)
      .select(['fullName', 'nickname', '-_id']);
  }

  addAvatar(nickname: string, url: string) {
    return this.userModel
      .findOneAndUpdate({ nickname, isDeleted: false }, { avatar: url })
      .select(['fullName', 'nickname', '-_id']);
  }

  getList(page: number, limit: number) {
    return this.userModel
      .find()
      .select(['fullName', 'nickname', '-_id'])
      .limit(limit * 1)
      .skip((page - 1) * limit);
  }

  delete(nickname: string) {
    return this.userModel.softDelete({ nickname });
  }
}
