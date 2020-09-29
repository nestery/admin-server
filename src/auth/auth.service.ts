import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload';
import { Jwtoken } from './jwtoken.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    async signUp(createUserDto: CreateUserDto) {
        return this.userRepository.signUp(createUserDto)
    }

    async signIn(userCredentialsDto: UserCredentialsDto): Promise<Jwtoken> {
        const user = await this.userRepository.authenticateUser(userCredentialsDto)
        const payload: JwtPayload = new JwtPayload(user)
        const accessToken = this.jwtService.sign(payload.toJSON())// need plain object for payload

        return { accessToken }
    }
}
