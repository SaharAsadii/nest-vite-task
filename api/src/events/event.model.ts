import { Field, ObjectType, ID } from "@nestjs/graphql"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { type Document, Schema as MongooseSchema } from "mongoose"
import { User } from "../users/user.model"

@ObjectType()
@Schema()
export class Event {
  @Field(() => ID)
  _id: string

  @Field(() => String)
  @Prop({ required: true })
  title: string

  @Field(() => String)
  @Prop({ required: true })
  description: string

  @Field(() => Date)
  @Prop({ required: true })
  date: Date

  @Field(() => User)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User" })
  organizer: User

  @Field(() => [RSVP])
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: "RSVP" }] })
  rsvps: RSVP[]

  @Field(() => Boolean)
  @Prop({ default: false })
  isFrozen: boolean
}

export type EventDocument = Event & Document
export const EventSchema = SchemaFactory.createForClass(Event)

@ObjectType()
@Schema()
export class RSVP {
  @Field(() => ID)
  _id: string

  @Field(() => User)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User" })
  user: User

  @Field(() => String)
  @Prop({ required: true, enum: ["yes", "no", "maybe"] })
  status: string

  @Field(() => ID)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Event" })
  eventId: string
}

export type RSVPDocument = RSVP & Document
export const RSVPSchema = SchemaFactory.createForClass(RSVP)
