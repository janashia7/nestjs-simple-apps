import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { LocationInterface } from 'src/interface/location.interface';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: Number })
  id: number;

  @Prop({ type: String })
  time: string;

  @Prop({ type: Object })
  location: LocationInterface;
}

export const UserSchema = SchemaFactory.createForClass(User);
