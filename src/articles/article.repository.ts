import { Repository, EntityRepository } from "typeorm";
import { Article } from "./article.entity";
import { CreateArticleDto } from "./dto/create-article.dto";

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article>{

    async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
        const article = new Article();

        for (const key in createArticleDto) {
            article[key] = createArticleDto[key]
        }

        await article.save()

        return article
    }
}