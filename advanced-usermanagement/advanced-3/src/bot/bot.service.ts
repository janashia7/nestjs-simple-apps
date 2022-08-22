import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TimezoneService } from 'src/timezone/timezone.service';
import { SubscriberData } from '../interface/subscriber.interface';
import { UserRepository } from '../db/user.repository';

@Injectable()
export class BotService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly timezoneService: TimezoneService,
  ) {}

  async addSubscriberOnLocation(subscriberData: SubscriberData) {
    return await this.userRepository.addSubscriber(subscriberData);
  }
  async addSubscriberOnTime(subscriberData: SubscriberData) {
    const user = await this.userRepository.findOne(subscriberData.id);
    if (!user) {
      throw new HttpException(
        'please first send me a location',
        HttpStatus.BAD_REQUEST,
      );
    }
    const location = user.location;
    const utcTime = this.timezoneService.timeConvert(
      subscriberData.time,
      location,
    );
    return this.userRepository.addSubscriber({
      time: utcTime,
      id: subscriberData.id,
    });
  }
  async findUserByTime(time: string) {
    return await this.userRepository.findAllSubscribes(time);
  }
}
