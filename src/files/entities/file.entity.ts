import { Entity, Column, ManyToOne, OneToOne, } from "typeorm";
import { GenericEntity } from "src/core/entity/generic.entity";
import { User } from "src/auth/user.entity";
import { Expose, Exclude } from "class-transformer";
import { Mimetypes } from "src/core/enums/mimetypes.enum";


@Exclude()
@Entity()
export class FileEntity extends GenericEntity {

    @Expose()
    @Column()
    path: string

    @Expose()
    @Column()
    filename: string

    @Expose()
    @Column()
    ext: string

    @Expose()
    @Column()
    encoding: string

    @Expose()
    @Column()
    mimetype: string

}