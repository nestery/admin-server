import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Strategy, ExtractJwt } from "passport-jwt";
import { JwtPayload } from "./jwt-payload";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";
import { jwtConstants } from "./constants";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: jwtConstants.secret
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { email } = payload
        return await this.userRepository.getUserByEmail(email)
    }
}