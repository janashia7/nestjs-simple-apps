import { Update, Start, Help, On, Hears } from 'nestjs-telegraf';
import { TimezoneService } from 'src/timezone/timezone.service';
import { buttons, receivedMsg, sendMsg } from 'src/utils/constants/constants';
import { Context } from 'telegraf';
import { BotService } from './bot.service';
import { WeatherService } from '../weather/weather.service';

@Update()
export class BotUpdate {
  constructor(
    private readonly botService: BotService,
    private readonly timezoneService: TimezoneService,
    private readonly weatherService: WeatherService,
  ) {}
  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply(sendMsg.onStartMsg, {
      reply_markup: {
        keyboard: [[buttons.help, buttons.description, buttons.subscribe]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
  }

  @Help()
  async helpCommand(ctx: Context) {
    await ctx.reply(sendMsg.onHelpMsg, {
      reply_markup: {
        keyboard: [[buttons.start, buttons.description, buttons.subscribe]],
        one_time_keyboard: true,
        resize_keyboard: true,
      },
    });
  }

  @Hears(receivedMsg.subscribe)
  async hearsSubscribe(ctx: Context) {
    await ctx.reply(sendMsg.onSubscribeMsg, {
      reply_markup: {
        keyboard: [[{ text: 'Send Location', request_location: true }]],
      },
    });
  }

  @On('location')
  async saveSubsData(ctx: Context) {
    const { location } = ctx.update['message'];
    const { id } = ctx.update['message'].from;
    this.botService.addSubscriberOnLocation({ id, location });
    await ctx.reply(sendMsg.onLocationMsg);
  }

  @Hears(receivedMsg.description)
  async hearsDescription(ctx: Context) {
    await ctx.reply(sendMsg.onDescribeMsg);
  }

  @Hears(receivedMsg.regExp)
  async hearsTime(ctx: Context) {
    try {
      const { id } = ctx.update['message'].from;
      const time = ctx.update['message'].text;
      await this.botService.addSubscriberOnTime({ id, time });
      await ctx.reply(sendMsg.onTimeMsg);
    } catch (err) {
      await ctx.reply(err.message);
    }
  }

  @On('message')
  async wrongMessage(ctx: Context) {
    await ctx.reply(sendMsg.onWrongMsg);
  }
}
