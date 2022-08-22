import { Field, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { User } from 'src/core/database/schema/user.schema';

@ObjectType()
export class UserEntity extends Document {
  @Field(() => String)
  nickname: string;

  @Field(() => String)
  fullName: string;

  @Field(() => String)
  password: string;
}
