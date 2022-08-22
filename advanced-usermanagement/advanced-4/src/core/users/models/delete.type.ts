import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserEntity } from './users.entity';

@ObjectType()
export class DeleteType {
  @Field(() => Int)
  deleted: number;
}
