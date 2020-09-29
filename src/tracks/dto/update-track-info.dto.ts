import { IGenericTrack } from "./generic-track.interface";
import { IsNotEmpty, IsString } from 'class-validator'
import { Transform } from "class-transformer";


export class UpdateTrackInfoDto implements IGenericTrack {
    @IsNotEmpty()
    @IsString()
    @Transform((val: string) => val.trim())
    name: string;

    @IsNotEmpty()
    @Transform(val => parseInt(val, 10))
    duration: number;

}