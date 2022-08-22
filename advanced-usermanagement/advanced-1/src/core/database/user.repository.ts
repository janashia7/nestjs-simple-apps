import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto, UpdateUserDto } from '../users/dto/user.dto';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
  ) {}

  async signup(userDto: CreateUserDto): Promise<User> {
    await this.userModel.create(userDto);
    return this.userModel
      .findOne({ nickname: userDto.nickname })
      .select(['nickname', 'fullName', '-_id']);
  }

  findOne(nickname: string) {
    return this.userModel.findOne({ nickname, isDeleted: false });
  }

  updateOne(nickname: string, userDto: UpdateUserDto) {
    return this.userModel.updateOne({ nickname, isDeleted: false }, userDto);
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
