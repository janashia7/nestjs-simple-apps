import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VoteDto } from '../votes/dto/vote.dto';
import { Vote, VoteDocument } from './schema/vote.schema';

@Injectable()
export class VoteRepository {
  constructor(@InjectModel(Vote.name) private voteModel: Model<VoteDocument>) {}

  giveVote(nickname: string, voteDto: VoteDto): Promise<Vote> {
    return this.voteModel.create({ voter: nickname, ...voteDto });
  }

  async checkVote(voter: string, votedFor: string) {
    return await this.voteModel.findOne({ voter, votedFor });
  }

  async updateVote(voter: string, voteDto: VoteDto) {
    return await this.voteModel.updateOne(
      { voter, votedFor: voteDto.votedFor },
      { vote: voteDto.vote },
    );
  }

  async totalVote(votedFor: string) {
    const votedUser = await this.voteModel.find({ votedFor });

    return votedUser.reduce((total, curr) => (total += curr.vote), 0);
  }
}
