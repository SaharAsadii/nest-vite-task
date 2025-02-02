import { Module, forwardRef } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { UsersResolver } from "./users.resolver"
import { UsersService } from "./users.service"
import { User, UserSchema } from "./user.model"
import { EventsModule } from "../events/events.module"
import { AuthModule } from "../auth/auth.module"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => EventsModule),
    forwardRef(() => AuthModule),
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
