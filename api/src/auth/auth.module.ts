import { Module, forwardRef } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { UsersModule } from "../users/users.module"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from "@nestjs/jwt"
import { AuthResolver } from "./auth.resolver"
import { LocalStrategy } from "./local.strategy"
import { JwtStrategy } from "./jwt.strategy"
import { EventsModule } from "../events/events.module"

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => EventsModule),
    PassportModule,
    JwtModule.register({
      secret: "your-secret-key", // In production, use environment variables
      signOptions: { expiresIn: "60m" },
    }),
  ],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
