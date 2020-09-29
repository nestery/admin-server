import { User } from "./user.entity"

export class JwtPayload {
    readonly email: string = ""

    constructor(user: User) {
        this.email = user.email
    }

    toJSON() {
        const fieldArray = Object.keys(this)
        return fieldArray.reduce((acc, val) => {
            acc[val] = this[val]
            return acc
        }, {})
    }
}