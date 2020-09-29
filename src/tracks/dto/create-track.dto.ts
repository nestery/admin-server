import { IGenericTrack } from "./generic-track.interface";
import { IsNotEmpty, IsNumber } from 'class-validator'
import { User } from "src/auth/user.entity";
import IFile from "src/core/interfaces/file.interface";
import { Transform } from "class-transformer";


export class CreateTrackDto implements IGenericTrack {
    readonly listen_count = 0

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @Transform(val => parseInt(val, 10))
    duration: number;

    @IsNotEmpty()
    files: IFile[]

    @IsNotEmpty()
    user: User
}