import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { AuthService } from "./auth.service"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "your-secret-key", // Use environment variables in production
    })
  }

  async validate(payload: any) {
    console.log({ payload }, "jwt strategy")
    const user = await this.authService.validateUserById(payload.sub) // Ensure 'sub' is used to find the user
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
