import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop()
  content: string;

  @Prop({ type: SchemaTypes.Array })
  likes = 0;
}

export const PostSchema = SchemaFactory.createForClass(Post);
