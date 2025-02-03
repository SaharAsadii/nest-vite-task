import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import type { Model } from "mongoose"
import {
  Event,
  type EventDocument,
  RSVP,
  type RSVPDocument,
} from "./event.model"
import type {
  CreateEventInput,
  UpdateEventInput,
  CreateRSVPInput,
  UpdateRSVPInput,
} from "./event.inputs"
import type { User } from "../users/user.model"

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(RSVP.name) private rsvpModel: Model<RSVPDocument>,
  ) {}

  async findAll(): Promise<Event[]> {
    const events = await this.eventModel
      .find()
      .populate("organizer")
      .populate("rsvps")
      .exec()

    return events.filter((event) => !!event.organizer)
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventModel
      .findById(id)
      .populate("organizer")
      .populate({
        path: "rsvps",
        populate: {
          path: "user",
          model: "User",
        },
      })
      .exec()

    if (!event) {
      throw new NotFoundException(`Event #${id} not found`)
    }
    return event
  }

  async findMyEvents(user: User): Promise<Event[]> {
    const events = await this.eventModel
      .find({ organizer: user._id })
      .populate("organizer")
      .populate("rsvps")
      .exec()
    return events.filter((event) => !!event.organizer)
  }

  async create(createEventInput: CreateEventInput, user: User): Promise<Event> {
    const createdEvent = new this.eventModel({
      ...createEventInput,
      organizer: user._id,
    })
    return createdEvent.save()
  }

  async update(id: string, updateEventInput: UpdateEventInput, user: User) {
    const event = await this.eventModel.findById(id)
    if (!event) {
      throw new NotFoundException(`Event #${id} not found`)
    }
    if (event.organizer.toString() !== user._id.toString()) {
      throw new ForbiddenException(
        "You are not authorized to update this event",
      )
    }
    return this.eventModel
      .findByIdAndUpdate(id, updateEventInput, { new: true })
      .exec()
  }

  async delete(id: string, user: User) {
    const event = await this.eventModel.findById(id)
    if (!event) {
      throw new NotFoundException(`Event #${id} not found`)
    }
    if (event.organizer.toString() !== user._id.toString()) {
      throw new ForbiddenException(
        "You are not authorized to delete this event",
      )
    }
    return this.eventModel.findByIdAndDelete(id).exec()
  }

  async createRSVP(
    createRSVPInput: CreateRSVPInput,
    user: User,
  ): Promise<RSVP> {
    const event = await this.eventModel.findById(createRSVPInput.eventId)
    if (!event) {
      throw new NotFoundException(`Event #${createRSVPInput.eventId} not found`)
    }
    if (event.isFrozen) {
      throw new ForbiddenException("rsvps for this event are frozen")
    }
    const existingRSVP = await this.rsvpModel.findOne({
      eventId: createRSVPInput.eventId,
      user: user._id,
    })
    if (existingRSVP) {
      throw new ForbiddenException("You have already RSVPed to this event")
    }
    const createdRSVP = new this.rsvpModel({
      ...createRSVPInput,
      user: user._id,
    })
    const savedRSVP = await createdRSVP.save()
    event.rsvps.push(savedRSVP._id)
    await event.save()
    return savedRSVP
  }

  async updateRSVP(updateRSVPInput: UpdateRSVPInput, user: User) {
    const rsvp = await this.rsvpModel.findById(updateRSVPInput.id)
    if (!rsvp) {
      throw new NotFoundException(`RSVP #${updateRSVPInput.id} not found`)
    }
    if (rsvp.user.toString() !== user._id.toString()) {
      throw new ForbiddenException("You are not authorized to update this RSVP")
    }
    const event = await this.eventModel.findById(rsvp._id)
    if (event?.isFrozen) {
      throw new ForbiddenException("rsvps for this event are frozen")
    }
    return this.rsvpModel
      .findByIdAndUpdate(updateRSVPInput.id, updateRSVPInput, { new: true })
      .exec()
  }

  async freezeEvent(id: string, user: User): Promise<Event> {
    const event = await this.eventModel.findById(id)
    if (!event) {
      throw new NotFoundException(`Event #${id} not found`)
    }
    if (event.organizer.toString() !== user._id.toString()) {
      throw new ForbiddenException(
        "You are not authorized to freeze this event",
      )
    }
    event.isFrozen = true
    return event.save()
  }
}
