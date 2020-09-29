import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { Expose, Exclude } from "class-transformer";

@Exclude()
export abstract class GenericEntity extends BaseEntity {

    @Expose()
    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @Expose()
    @CreateDateColumn()
    creation_date: Date

    public setField(fieldname: string, value: any): void {
        this[fieldname] = value
    }

}