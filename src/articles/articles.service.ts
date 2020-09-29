import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleRepository } from './article.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { UpdateArticleDto } from './dto/update-article.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ArticlesService {

    constructor(
        @InjectRepository(ArticleRepository)
        private articleRepository: ArticleRepository,
    ) { }

    async getAllArticles(): Promise<Article[]> {
        return await this.articleRepository.find()
    }

    async getArticleByUuid(uuid: string): Promise<Article> {

        const found = await this.articleRepository.findOne(uuid)
        if (!found) {
            throw new NotFoundException(`Not found article with uuid ${uuid}`)
        }
        return found
    }

    async createArticle(createArticleDto: CreateArticleDto) {
        return this.articleRepository.createArticle(createArticleDto)
    }

    async deleteArticle(uuid: string): Promise<void> {
        const result = await this.articleRepository.delete(uuid)

        if (result.affected === 0) {
            throw new NotFoundException(`Not found article with uuid ${uuid}`)
        }
    }

    async updateArticle(uuid: string, updateArticleDto: UpdateArticleDto): Promise<Article> {

        const article = await this.getArticleByUuid(uuid)
        await this.articleRepository.update(article, updateArticleDto)

        for (const key in updateArticleDto) {
            article[key] = updateArticleDto[key]
        }
        return article
    }

}
