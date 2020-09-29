import { Fieldnames } from "../enums/fieldnames.enum";

export interface FormdataFile {
    file: any
    fields: any
    fieldname: Fieldnames
    filename: string
    encoding: string
    mimetype: string
}