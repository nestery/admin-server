import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { PostgresErrorCodes } from "src/core/exceptions/db/postgres-error-codes.enum";
import { ConflictException, InternalServerErrorException, UnauthorizedException, NotFoundException } from "@nestjs/common";
import { genSalt, hash } from 'bcrypt'
import { UserCredentialsDto } from "./dto/user-credentials.dto";
import { ExceptionMessages } from "src/core/exceptions/exeptions-msg.enum";
import { InvalidPasswordException } from "src/core/exceptions/auth/invalid-password.exeption";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.findOne({ email })
        if (!user) {
            throw new NotFoundException()
        }
        return user
    }

    async signUp(createUserDto: CreateUserDto) {
        try {
            const user = new User()
            const salt = await genSalt()

            for (const key in createUserDto) {
                user[key] = createUserDto[key]
            }

            const hashedPassword = await this.hashPassword(user.password, salt)
            user.salt = salt
            user.password = hashedPassword

            await user.save()
        } catch (error) {
            switch (error.code) {
                case PostgresErrorCodes.DUPLICATE_ERROR:
                    throw new ConflictException()
                default:
                    throw new InternalServerErrorException()
            }
        }
    }

    async authenticateUser(userCredentialsDto: UserCredentialsDto): Promise<User> {
        try {
            const { email, password } = userCredentialsDto
            const user = await this.getUserByEmail(email)

            if (await this.validatePassword(password, user.password, user.salt)) {
                return user
            }

        } catch (error) {
            throw new UnauthorizedException(ExceptionMessages.INVALID_USER_OR_PASSWORD)
        }

    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return await hash(password, salt)
    }

    private async validatePassword(password: string, hash: string, salt: string): Promise<boolean> {
        if (await this.hashPassword(password, salt) === hash) {
            return true
        } else {
            throw new InvalidPasswordException()
        }
    }
}