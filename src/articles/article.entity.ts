import { Entity, Column, ManyToOne } from "typeorm";
import { GenericEntity } from "src/core/entity/generic.entity";
import { User } from "src/auth/user.entity";
import { Expose, Exclude } from "class-transformer";

@Exclude()
@Entity()
export class Article extends GenericEntity {

    @Expose()
    @Column()
    title: string;

    @Expose()
    @Column()
    description: string;

    @Expose()
    @Column()
    body: string;

    @Expose()
    @Column()
    thumb: string;

    @Expose()
    @Column()
    link_name: string;

    @Column()
    view_count: number;

    @Column()
    userUuid: string
    // @Column()
    // tags: Tag[];

}