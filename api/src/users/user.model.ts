import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { Document } from 'mongoose';

@ObjectType()
@Schema()
export class User {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Field()
  @Prop({ required: true })
  name: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
