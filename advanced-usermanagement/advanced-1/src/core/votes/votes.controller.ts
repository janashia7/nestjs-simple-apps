import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { VoteUpdateGuard } from './guards/vote-update.guard';
import { VoteDto } from './dto/vote.dto';
import { VotesService } from './votes.service';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @UseGuards(JwtAuthGuard, VoteUpdateGuard)
  @Post()
  async giveVote(@Body() voteDto: VoteDto, @Request() req) {
    try {
      const {
        user: { nickname },
      } = req;

      return await this.votesService.giveVote(nickname, voteDto);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.FORBIDDEN);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':nickname')
  async totalVote(@Param('nickname') nickname: string) {
    try {
      return await this.votesService.totalVote(nickname);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.FORBIDDEN);
    }
  }
}
