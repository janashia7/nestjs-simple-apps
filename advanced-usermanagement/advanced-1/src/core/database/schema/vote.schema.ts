import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Votes } from '../constants/enum';

export type VoteDocument = Vote & Document;

@Schema()
export class Vote {
  @Prop({ type: String })
  voter: string;

  @Prop({ type: String, required: true })
  votedFor: string;

  @Prop({ type: Number, enum: Votes, required: true })
  vote: number;

  @Prop({ type: Number, default: Date.now() })
  date: number;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);
