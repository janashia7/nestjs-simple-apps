import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { SubscriberData } from '../interface/subscriber.interface';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async findAllSubscribes(time: string) {
    return await this.userModel.find({ time });
  }

  findOne(id: number) {
    return this.userModel.findOne({ id });
  }

  addSubscriber(subscriberData: SubscriberData) {
    return this.userModel.updateOne({ id: subscriberData.id }, subscriberData, {
      upsert: true,
    });
  }
}
