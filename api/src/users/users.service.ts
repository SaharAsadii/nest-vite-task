import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import type { Model } from "mongoose"
import { User, type UserDocument } from "./user.model"
import type { CreateUserInput } from "./user.inputs"
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10)
    const createdUser = new this.userModel({
      ...createUserInput,
      password: hashedPassword,
    })
    return createdUser.save()
  }

  async findOne(email: string) {
    return this.userModel.findOne({ email }).exec()
  }

  async findById(userId: string) {
    return this.userModel.findById(userId).exec()
  }
}
