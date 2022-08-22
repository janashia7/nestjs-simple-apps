import { IsString } from 'class-validator';

export class DeleteMsg {
  @IsString()
  msgId: string;

  @IsString()
  message: string;
}
