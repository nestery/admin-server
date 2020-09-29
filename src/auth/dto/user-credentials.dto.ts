import { IsNotEmpty, IsEmail, MinLength, IsString } from "class-validator";

export class UserCredentialsDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string
}