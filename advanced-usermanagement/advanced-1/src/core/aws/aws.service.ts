import { Injectable, OnModuleInit } from '@nestjs/common';
import { SQS } from 'aws-sdk';
import config from '../config/config';
import { InjectAwsService } from 'nest-aws-sdk';
import { UsersService } from '../users/users.service';

@Injectable()
export class AwsSQSService implements OnModuleInit {
  queueUrl: string;
  bucketUrl: string;
  constructor(
    @InjectAwsService(SQS) private readonly sqs: SQS,
    private readonly userService: UsersService,
  ) {
    this.queueUrl = config().aws.services.sqs.queueUrl;
    this.bucketUrl = config().aws.services.s3.bucketUrl;
  }
  async avatarsProperties() {
    const { Messages } = await this.sqs
      .receiveMessage({
        VisibilityTimeout: 10,
        WaitTimeSeconds: 5,
        MaxNumberOfMessages: 10,
        QueueUrl: this.queueUrl,
      })
      .promise();
    if (Messages) {
      const promises = [];
      const avatarsProperties = [];
      for (const message of Messages) {
        const msgBody = JSON.parse(message.Body);
        const { key } = msgBody.Records[0].s3.object;
        const url = this.bucketUrl + key;
        avatarsProperties.push({
          nickname: key,
          url,
        });
        promises.push(
          this.sqs
            .deleteMessage({
              QueueUrl: this.queueUrl,
              ReceiptHandle: message.ReceiptHandle,
            })
            .promise(),
        );
      }
      return avatarsProperties;
    }
  }

  async processAvatars() {
    const promises = [];
    const avatarsProperties = await this.avatarsProperties();
    if (avatarsProperties === undefined || avatarsProperties.length === 0) {
      return;
    }

    for (const { nickname, url } of avatarsProperties) {
      promises.push(this.addAvatars(nickname, url));
    }
  }

  async addAvatars(nickname: string, url: string) {
    await this.userService.addAvatar(nickname, url);
  }

  onModuleInit() {
    setInterval(async () => await this.processAvatars(), 5000);
  }
}
