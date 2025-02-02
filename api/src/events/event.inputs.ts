import { InputType, Field, ID } from "@nestjs/graphql"

@InputType()
export class CreateEventInput {
  @Field(() => String)
  title: string

  @Field(() => String)
  description: string

  @Field(() => Date)
  date: Date
}

@InputType()
export class UpdateEventInput {
  @Field(() => ID)
  id: string

  @Field(() => String, { nullable: true })
  title?: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => Date, { nullable: true })
  date?: Date
}

@InputType()
export class CreateRSVPInput {
  @Field(() => ID)
  eventId: string

  @Field(() => String)
  status: string
}

@InputType()
export class UpdateRSVPInput {
  @Field(() => ID)
  id: string

  @Field(() => String)
  status: string
}
