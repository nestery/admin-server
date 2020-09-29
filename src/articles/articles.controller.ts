import { Controller, Get, Post, Body, Param, ParseUUIDPipe, Delete, Patch, UsePipes, ValidationPipe, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './article.entity';
import { UpdateArticleDto } from './dto/update-article.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserToBody } from 'src/auth/user-to-body.decorator';


@Controller('articles')
export class ArticlesController {
    constructor(private articlesService: ArticlesService) { }

    @Get()
    getArticles(): Promise<Article[]> {
        return this.articlesService.getAllArticles()
    }

    @Get('/:uuid')
    getArticleByUuid(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
        return this.articlesService.getArticleByUuid(uuid)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    @UseGuards(AuthGuard())
    @UsePipes(new ValidationPipe({ transform: true }))
    createArticle(
        @UserToBody()
        @Body() createArticleDto: CreateArticleDto,
    ): Promise<Article> {
        return this.articlesService.createArticle(createArticleDto)
    }

    @Delete('/:uuid')
    @UseGuards(AuthGuard())
    deleteArticle(@Param('uuid', new ParseUUIDPipe()) uuid: string): Promise<void> {
        return this.articlesService.deleteArticle(uuid)
    }

    @Patch('/:uuid')
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    updateArticle(
        @Body() updateArticleDto: UpdateArticleDto,
        @Param('uuid', new ParseUUIDPipe()) uuid: string
    ): Promise<Article> {
        return this.articlesService.updateArticle(uuid, updateArticleDto)
    }
}
