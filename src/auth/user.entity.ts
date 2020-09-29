import { Column, Entity, Unique, OneToMany } from "typeorm"
import { GenericEntity } from "src/core/entity/generic.entity"
import { Article } from "src/articles/article.entity"
import { Exclude, Expose } from "class-transformer"
import { Track } from "src/tracks/track.entity"

@Exclude()
@Entity()
@Unique(['email'])
export class User extends GenericEntity {
    @Expose()
    @Column()
    email: string

    @Column()
    password: string

    @Column()
    admin: boolean

    @Column()
    salt: string

    @OneToMany(type => Track, track => track.user, { eager: false })
    tracks: Track[]
}