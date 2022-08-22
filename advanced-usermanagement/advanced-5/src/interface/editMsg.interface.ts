import { IsString } from 'class-validator';

export class EditMsg {
  @IsString()
  msgId: string;

  @IsString()
  message: string;
}
