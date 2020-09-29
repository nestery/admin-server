import { Entity, Column, ManyToOne, OneToOne, } from "typeorm";
import { GenericEntity } from "src/core/entity/generic.entity";
import { User } from "src/auth/user.entity";
import { Expose, Exclude } from "class-transformer";
import { Mimetypes } from "src/core/enums/mimetypes.enum";
import { FileEntity } from "./file.entity";
import { Track } from "src/tracks/track.entity";


@Exclude()
@Entity()
export class AudioFileEntity extends FileEntity {

    @Expose()
    @OneToOne(type => Track)
    track: Track;

}