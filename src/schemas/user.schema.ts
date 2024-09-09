import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseWithTimestamps } from './base.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends BaseWithTimestamps {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  gender: string;

  @Prop({ required: false })
  occupation: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
