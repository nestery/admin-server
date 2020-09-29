import { Controller, Post, Body, UsePipes, ValidationPipe, Get, UseGuards, UseInterceptors, ClassSerializerInterceptor, HttpCode } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    @UsePipes(new ValidationPipe({ transform: true }))
    signUp(@Body() createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto)

    }

    @Post('/signin')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    signIn(@Body() userCredentialsDto: UserCredentialsDto) {
        return this.authService.signIn(userCredentialsDto)
    }

    @Post('/signout')
    @HttpCode(204)
    signOut() {
        return
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/user')
    @UseGuards(AuthGuard())
    sendUser(@GetUser() user: User) {
        return user
    }
}
