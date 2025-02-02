import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { EventsResolver } from "./events.resolver"
import { EventsService } from "./events.service"
import { Event, EventSchema, RSVP, RSVPSchema } from "./event.model"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: RSVP.name, schema: RSVPSchema },
    ]),
  ],
  providers: [EventsResolver, EventsService],
  exports: [EventsService],
})
export class EventsModule {}
