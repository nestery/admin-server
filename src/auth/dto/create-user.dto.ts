import { IGenericUser } from "./generic-user.interface";
import { UserCredentialsDto } from './user-credentials.dto'

export class CreateUserDto extends UserCredentialsDto implements IGenericUser {
    readonly admin = false
}