import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateUsersInput {
  @Field()
  @IsString()
  nickname: string;

  @Field()
  @IsString()
  fullName: string;

  @Field()
  @IsString()
  password: string;

  @Field({ nullable: true })
  salt?: string;
}
