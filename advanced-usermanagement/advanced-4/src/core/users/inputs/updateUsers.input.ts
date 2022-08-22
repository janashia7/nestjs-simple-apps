import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUser {
  @Field()
  fullName?: string;

  @Field()
  password?: string;

  @Field()
  salt?: string;
}

@InputType()
export class UpdateUsersInput extends PartialType(UpdateUser) {}
