import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BotModule } from 'src/bot/bot.module';
import { WeatherModule } from 'src/weather/weather.module';
import { CronService } from './cron.service';

@Module({
  imports: [BotModule, WeatherModule, HttpModule],
  providers: [CronService],
  exports: [CronService],
})
export class CronModule {}
