import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from './users.entity';

@ObjectType()
export class UsersToken {
  @Field()
  token: string;

  @Field(() => UserEntity)
  user: UserEntity;
}
