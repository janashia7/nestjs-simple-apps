import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class LoginUsersInput {
  @Field()
  @IsString()
  nickname: string;

  @Field()
  @IsString()
  password: string;
}
