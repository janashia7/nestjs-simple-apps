import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment-timezone';
import { BotService } from 'src/bot/bot.service';
import { WeatherService } from 'src/weather/weather.service';
import config from 'src/config/config';
import { SubscriberData } from 'src/interface/subscriber.interface';

@Injectable()
export class CronService {
  constructor(
    @Inject(BotService) private readonly botService: BotService,
    private readonly weatherService: WeatherService,
    private httpService: HttpService,
  ) {}
  @Cron(' * * * * *')
  async cron() {
    const date = new Date();
    const convertedTime = moment(date, 'HH:mm').utc().format('HH:mm');
    const users = await this.botService.findUserByTime(convertedTime);
    return users.map((subscriber: SubscriberData) =>
      this.weatherService.proceedWeatherData(subscriber.location).subscribe({
        next: (data) => this.sendMsg(subscriber.id, data),
      }),
    );
  }

  private async sendMsg(chat_id: number, data: string) {
    return this.httpService
      .post(config().telegram.sendMsgUrl, {
        chat_id,
        text: data,
      })
      .subscribe();
  }
}
