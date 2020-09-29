import { IGenericArticle } from "./generic-article.interface";
import { IsNotEmpty } from 'class-validator'
import { User } from "src/auth/user.entity";


export class CreateArticleDto implements IGenericArticle {
    readonly view_count = 0

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    body: string;

    @IsNotEmpty()
    thumb: string;

    @IsNotEmpty()
    link_name: string;

    @IsNotEmpty()
    user: User
}