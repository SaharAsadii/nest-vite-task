import { Injectable, Inject, forwardRef } from "@nestjs/common"
import { UsersService } from "../users/users.service"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email)

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user
      return result
    }

    return null
  }

  async validateUserById(userId: string): Promise<any> {
    return this.usersService.findById(userId)
  }

  async login(user: any) {
    const userByEmail = await this.usersService.findOne(user.email)
    console.log({ userByEmail })
    const payload = { email: user.email, sub: userByEmail?._id }
    return {
      accessToken: this.jwtService.sign(payload),
    }
  }
}
