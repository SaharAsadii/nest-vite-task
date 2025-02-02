import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext().req
    console.log(
      request.user,
      "current user - request.user",
      request.user ?? ctx.getArgs().loginInput,
    )
    return request.user ?? ctx.getArgs().loginInput
  },
)
