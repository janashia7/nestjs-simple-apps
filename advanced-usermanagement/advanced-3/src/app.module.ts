import { CronModule } from './cron/cron.module';
import { DbModule } from './db/db.module';
import { BotModule } from './bot/bot.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TelegrafModule } from 'nestjs-telegraf';
import { ScheduleModule } from '@nestjs/schedule';
import config from './config/config';

@Module({
  imports: [
    CronModule,
    DbModule,
    BotModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(config().database.uri),
    TelegrafModule.forRoot({
      token: config().telegram.token,
    }),
  ],
})
export class AppModule {}
