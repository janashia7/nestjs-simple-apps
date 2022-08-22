import { BotService } from './bot.service';

import { Module } from '@nestjs/common';
import { BotUpdate } from './bot.update';
import { DbModule } from 'src/db/db.module';
import { TimezoneService } from 'src/timezone/timezone.service';
import { WeatherModule } from '../weather/weather.module';

@Module({
  imports: [DbModule, WeatherModule],
  providers: [BotService, BotUpdate, TimezoneService],
  exports: [BotService],
})
export class BotModule {}
