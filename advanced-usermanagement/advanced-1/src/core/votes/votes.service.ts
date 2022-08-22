import { Injectable, NotAcceptableException } from '@nestjs/common';
import { VoteRepository } from '../database/vote.repository';
import { VoteDto } from './dto/vote.dto';

@Injectable()
export class VotesService {
  constructor(private readonly voteRepository: VoteRepository) {}

  async giveVote(nickname: string, voteDto: VoteDto) {
    const voted = await this.checkVote(nickname, voteDto.votedFor);
    if (voted && voted.vote !== voteDto.vote) {
      return await this.updateVote(nickname, voteDto);
    }

    if (voted) {
      throw new NotAcceptableException();
    }

    return await this.voteRepository.giveVote(nickname, voteDto);
  }

  async checkVote(voter: string, votedFor: string) {
    return await this.voteRepository.checkVote(voter, votedFor);
  }

  async updateVote(nickname: string, voteDto: VoteDto) {
    return await this.voteRepository.updateVote(nickname, voteDto);
  }

  async totalVote(nickname) {
    return await this.voteRepository.totalVote(nickname);
  }
}
