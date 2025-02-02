import { Resolver, Query, Mutation, Args } from "@nestjs/graphql"
import { User } from "./user.model"
import { UsersService } from "./users.service"
import { CreateUserInput } from "./user.inputs"
import { UseGuards, Inject } from "@nestjs/common"
import { GqlAuthGuard } from "../auth/gql-auth.guard"
import { CurrentUser } from "../auth/current-user.decorator"

@Resolver(() => User)
export class UsersResolver {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User) {
    return user
  }

  @Mutation(() => User)
  async createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput)
  }
}
