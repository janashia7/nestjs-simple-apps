import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { VotesService } from '../votes.service';

@Injectable()
export class VoteUpdateGuard implements CanActivate {
  constructor(private readonly votesService: VotesService) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    const HOUR = 3600000;
    const req = context.switchToHttp().getRequest();
    const { user, body } = req;
    if (user.nickname === body.votedFor) {
      throw new ForbiddenException('Can not vote for yourself');
    }
    const vote = await this.votesService.checkVote(
      user.nickname,
      body.votedFor,
    );

    if (!vote) {
      return true;
    }

    const now = Date.now();
    const ms = now - vote.date;
    const diff = Math.floor(ms / 60000);
    if (vote && now - vote.date <= HOUR) {
      throw new ForbiddenException(`Please, wait for ${60 - diff} minutes`);
    }
    return true;
  }
}
