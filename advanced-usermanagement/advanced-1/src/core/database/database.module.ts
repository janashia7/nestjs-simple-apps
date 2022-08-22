import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { Vote, VoteSchema } from './schema/vote.schema';
import { UserRepository } from './user.repository';
import { VoteRepository } from './vote.repository';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Vote.name, schema: VoteSchema },
    ]),
  ],
  providers: [UserRepository, VoteRepository],
  exports: [UserRepository, VoteRepository],
})
export class DatabaseModule {}
