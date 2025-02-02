import { Resolver, Mutation, Args } from "@nestjs/graphql"
import { AuthService } from "./auth.service"
import { LoginResponse } from "./auth.model"
import { LoginInput } from "./auth.inputs" // Ensure this import is correct
import { UseGuards, Inject } from "@nestjs/common"
import { LocalAuthGuard } from "./local-auth.guard"
import { CurrentUser } from "./current-user.decorator"
import { User } from "../users/user.model"

@Resolver()
export class AuthResolver {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(LocalAuthGuard)
  async login(
    @Args("loginInput") loginInput: LoginInput,
    @CurrentUser() user: User,
  ) {
    return this.authService.login(user)
  }
}
