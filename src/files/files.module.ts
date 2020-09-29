import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudioFileEntity } from './entities/audio-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AudioFileEntity])],
  providers: [FilesService],
  controllers: [FilesController]
})
export class FilesModule { }
