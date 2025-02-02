import { Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { GqlExecutionContext } from "@nestjs/graphql"
import type { ExecutionContext } from "@nestjs/common"

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {
  constructor() {
    super()
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext()
    request.body = ctx.getArgs().loginInput

    return request
  }
}
