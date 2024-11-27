import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import{ HydratedDocument } from 'mongoose';

export type tasksDocument = HydratedDocument<Tasks>;
@Schema()
export class TasksController {
  @Prop({ required: true })
  name: string;
  @Prop({required: true})
  description: string;
  @Prop()
  point: number;
}
