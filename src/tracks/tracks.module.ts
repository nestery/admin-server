import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackRepository } from './track.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TrackRepository]), AuthModule],
  providers: [TracksService],
  controllers: [TracksController]
})
export class TracksModule { }
