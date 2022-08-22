import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AwsSQSService } from './aws.service';

@Module({
  imports: [UsersModule],
  providers: [AwsSQSService],
  exports: [AwsSQSService],
})
export class AwsModule {}
