import { VotesModule } from './core/votes/votes.module';
import { UsersModule } from './core/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './core/database/database.module';
import { AwsSdkModule } from 'nest-aws-sdk';
import config from './core/config/config';
import { SQS } from 'aws-sdk';
import { AwsModule } from './core/aws/aws.module';

@Module({
  imports: [
    VotesModule,
    UsersModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(config().database.uri),
    DatabaseModule,
    AwsModule,
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        useValue: {
          ...config().aws.config.defaultServiceOptions,
        },
      },
      services: [SQS],
    }),
  ],
})
export class AppModule {}
