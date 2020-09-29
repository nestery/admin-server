import { Controller, Post, UseGuards, UseInterceptors, Patch } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { AuthGuard } from '@nestjs/passport';
import { ContentTypes } from 'src/core/enums/content-types.enum';
import { UploadedFormdataFiles } from 'src/core/decorators/uploaded-formdata-files-parts.decorator copy';
import { ContentTypeValidator } from 'src/core/interceptors/content-type-validator.interceptor';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { FormdataFile } from './interfaces/formdata-file.interface';


@Controller('tracks')
export class TracksController {
    constructor(private tracksService: TracksService) { }

    // @Post()
    // @UseInterceptors(new ContentTypeValidator(ContentTypes.FORMDATA))
    // @UseGuards(AuthGuard())
    // addNewTrack(
    //     @UploadedFormdataFiles() files: FormdataFile[], @GetUser() user: User) {
    //     return this.tracksService.addNewTrack(files, user)
    // }

    // @Patch(':uuid')
    // @UseGuards(AuthGuard())
    // updateTrackInfo()
}
