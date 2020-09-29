import { Entity, Column, ManyToOne, } from "typeorm";
import { GenericEntity } from "src/core/entity/generic.entity";
import { User } from "src/auth/user.entity";
import { Expose, Exclude } from "class-transformer";


@Exclude()
@Entity()
export class Track extends GenericEntity {

    @Expose()
    @Column({ nullable: true })
    name: string;

    @Expose()
    @Column({ nullable: true })
    duration: number;

    @Expose()
    @Column({ nullable: true })
    audio: string;

    @Expose()
    @Column({ nullable: true })
    cover: string;

    @Expose()
    @Column({ nullable: true })
    artist: string;

    @Column({ default: 0 })
    play_count: number;

    @ManyToOne(type => User, user => user.tracks, { eager: false })
    user: User

    @Column()
    userUuid: string

    public setField(fieldname: string, value: any): void {
        this[fieldname] = value
    }


}