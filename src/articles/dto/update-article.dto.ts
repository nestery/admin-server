import { IGenericArticle } from "./generic-article.interface";
import { IsOptional } from "class-validator";

export class UpdateArticleDto implements IGenericArticle {

    @IsOptional()
    title: string;

    @IsOptional()
    description: string;

    @IsOptional()
    body: string;

    @IsOptional()
    thumb: string;

    @IsOptional()
    link_name: string;

}