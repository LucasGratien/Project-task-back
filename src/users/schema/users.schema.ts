import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type userDocument = HydratedDocument<Users>;
@Schema()
export class Users {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 0 })
  point: number;
}
export const UserSchema = SchemaFactory.createForClass(Users);
