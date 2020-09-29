import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { TagsModule } from './tags/tags.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { TracksModule } from './tracks/tracks.module';
import { FilesModule } from './files/files.module';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ArticlesModule, TagsModule, AuthModule, TracksModule, FilesModule,],
})
export class AppModule { }
