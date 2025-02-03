import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql"
import { Event, RSVP } from "./event.model"
import { EventsService } from "./events.service"
import {
  CreateEventInput,
  UpdateEventInput,
  CreateRSVPInput,
  UpdateRSVPInput,
} from "./event.inputs"
import { UseGuards, Inject } from "@nestjs/common"
import { GqlAuthGuard } from "../auth/gql-auth.guard"
import { CurrentUser } from "../auth/current-user.decorator"
import type { User } from "../users/user.model"

@Resolver(() => Event)
export class EventsResolver {
  constructor(
    @Inject(EventsService) private readonly eventsService: EventsService,
  ) {}

  @Query(() => [Event])
  async events(): Promise<Event[]> {
    return this.eventsService.findAll()
  }

  @Query(() => Event)
  async event(@Args("id", { type: () => ID }) id: string): Promise<Event> {
    return this.eventsService.findOne(id)
  }

  @Query(() => [Event])
  @UseGuards(GqlAuthGuard)
  async myEvents(@CurrentUser() user: User): Promise<Event[]> {
    return this.eventsService.findMyEvents(user)
  }

  @Mutation(() => Event)
  @UseGuards(GqlAuthGuard)
  async createEvent(
    @Args("createEventInput", { type: () => CreateEventInput })
    createEventInput: CreateEventInput,
    @CurrentUser() user: User,
  ): Promise<Event> {
    return this.eventsService.create(createEventInput, user)
  }

  @Mutation(() => Event)
  @UseGuards(GqlAuthGuard)
  async updateEvent(
    @Args("updateEventInput", { type: () => UpdateEventInput })
    updateEventInput: UpdateEventInput,
    @CurrentUser() user: User,
  ) {
    return this.eventsService.update(
      updateEventInput.id,
      updateEventInput,
      user,
    )
  }

  @Mutation(() => Event)
  @UseGuards(GqlAuthGuard)
  async deleteEvent(
    @Args("id", { type: () => ID }) id: string,
    @CurrentUser() user: User,
  ) {
    return this.eventsService.delete(id, user)
  }

  @Mutation(() => RSVP)
  @UseGuards(GqlAuthGuard)
  async createRSVP(
    @Args("createRSVPInput", { type: () => CreateRSVPInput })
    createRSVPInput: CreateRSVPInput,
    @CurrentUser() user: User,
  ): Promise<RSVP> {
    return this.eventsService.createRSVP(createRSVPInput, user)
  }

  @Mutation(() => RSVP)
  @UseGuards(GqlAuthGuard)
  async updateRSVP(
    @Args("updateRSVPInput", { type: () => UpdateRSVPInput })
    updateRSVPInput: UpdateRSVPInput,
    @CurrentUser() user: User,
  ) {
    return this.eventsService.updateRSVP(updateRSVPInput, user)
  }

  @Mutation(() => Event)
  @UseGuards(GqlAuthGuard)
  async freezeEvent(
    @Args("id", { type: () => ID }) id: string,
    @CurrentUser() user: User,
  ): Promise<Event> {
    return this.eventsService.freezeEvent(id, user)
  }
}
