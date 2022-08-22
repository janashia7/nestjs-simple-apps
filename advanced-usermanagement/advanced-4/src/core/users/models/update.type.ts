import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from './users.entity';

@ObjectType()
export class UpdateUserMsg {
  @Field()
  message: string;
}
