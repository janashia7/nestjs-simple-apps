import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { Role } from '../constants/enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, unique: true })
  nickname: string;

  @Prop({ type: String, required: true })
  fullName: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String })
  salt: string;

  @Prop({ enum: Role, default: Role.USER })
  role: Role;

  @Prop({ type: String })
  avatar: string;

  @Prop({ type: Date, required: false })
  updatedAt: Date;
}

export const UserSchema =
  SchemaFactory.createForClass(User).plugin(softDeletePlugin);
