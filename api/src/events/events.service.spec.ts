import { Test, type TestingModule } from "@nestjs/testing"
import { EventsService } from "./events.service"
import { getModelToken } from "@nestjs/mongoose"
import { Event, RSVP } from "./event.model"
import { User } from "../users/user.model"
import type { CreateEventInput } from "./event.inputs"
import { NotFoundException } from "@nestjs/common"

describe("EventsService", () => {
  let service: EventsService
  let eventModel: any
  let rsvpModel: any
  let userModel: any

  const mockEventModel = {
    findById: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  }

  const mockRSVPModel = {
    create: jest.fn(),
    find: jest.fn(),
  }

  const mockUserModel = {
    findByIdAndUpdate: jest.fn(),
    findById: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getModelToken(Event.name),
          useValue: mockEventModel,
        },
        {
          provide: getModelToken(RSVP.name),
          useValue: mockRSVPModel,
        },
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile()

    service = module.get<EventsService>(EventsService)
    eventModel = module.get(getModelToken(Event.name))
    rsvpModel = module.get(getModelToken(RSVP.name))
    userModel = module.get(getModelToken(User.name))
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })

  // describe("create", () => {
  //   it("should create a new event", async () => {
  //     const createEventInput: CreateEventInput = {
  //       title: "Test Event",
  //       description: "This is a test event",
  //       date: new Date(),
  //     }

  //     const user: User = {
  //       _id: "user123",
  //       name: "Test User",
  //       email: "test@example.com",
  //     } as User

  //     const createdEvent = {
  //       ...createEventInput,
  //       _id: "event123",
  //       organizer: user._id,
  //     }

  //     mockEventModel.create.mockResolvedValue(createdEvent)
  //     mockUserModel.findByIdAndUpdate.mockResolvedValue(user)

  //     const result = await service.create(createEventInput, user)

  //     expect(mockEventModel.create).toHaveBeenCalledWith({
  //       ...createEventInput,
  //       organizer: user._id,
  //     })
  //     expect(mockUserModel.findByIdAndUpdate).toHaveBeenCalledWith(user._id, {
  //       $push: { events: "event123" },
  //     })
  //     expect(result).toEqual(createdEvent)
  //   })
  // })
  describe("findAll", () => {
    it("should return all events", async () => {
      const events = [
        {
          _id: "event1",
          title: "Event 1",
          description: "Description 1",
          date: new Date(),
          organizer: "user1",
        },
        {
          _id: "event2",
          title: "Event 2",
          description: "Description 2",
          date: new Date(),
          organizer: "user2",
        },
      ]
      mockEventModel.find.mockImplementation(() => ({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(events),
      }))
      const result = await service.findAll()
      expect(result).toEqual(events)
    })
  })

  describe("findOne", () => {
    it("should return a single event", async () => {
      const event = {
        _id: "event1",
        title: "Event 1",
        description: "Description 1",
        date: new Date(),
        organizer: "user1",
      }
      mockEventModel.findById.mockImplementation(() => ({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(event),
      }))
      const result = await service.findOne("event1")
      expect(result).toEqual(event)
    })

    it("should throw NotFoundException if event not found", async () => {
      mockEventModel.findById.mockImplementation(() => ({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(null),
      }))
      await expect(service.findOne("event1")).rejects.toThrow(NotFoundException)
    })
  })
  //   })
  // })
})
