import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleRepository]), AuthModule],
  controllers: [ArticlesController],
  providers: [ArticlesService]
})
export class ArticlesModule { }
