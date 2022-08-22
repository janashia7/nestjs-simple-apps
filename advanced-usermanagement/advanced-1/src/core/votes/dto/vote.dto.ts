import { IsNumber, IsString } from 'class-validator';

export class VoteDto {
  @IsString()
  votedFor: string;

  @IsNumber()
  vote: number;
}
