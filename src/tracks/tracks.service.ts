import { Injectable, BadRequestException, UnsupportedMediaTypeException, NotFoundException } from '@nestjs/common';
import { ExceptionMessages } from 'src/core/exceptions/exeptions-msg.enum';
import { User } from 'src/auth/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackRepository } from './track.repository';
import { Track } from './track.entity';
import { FormdataFile } from './interfaces/formdata-file.interface';
import { Fieldnames } from './enums/fieldnames.enum';
import { AllowedMimetypes } from './enums/allowed-mimetypes.enum';
import { uploadFormdataFile } from 'src/core/utility/utility';
import { UploadingResult } from './interfaces/uploading-result.interface';
import { UpdateTrackInfoDto } from './dto/update-track-info.dto';

@Injectable()
export class TracksService {
    constructor(@InjectRepository(TrackRepository)
    private trackRepository: TrackRepository) { }

    private async createTrack(user: User): Promise<Track> {
        return await this.trackRepository.createTrack(user)
    }

    private async uploadFile(file: FormdataFile, uuid: string): Promise<UploadingResult> {

        if (!(<any>Object).values(Fieldnames).includes(file.fieldname)) {
            throw new BadRequestException(`${ExceptionMessages.NOT_SUPPORTED_FIELDNAME}: ${file.fieldname} `)
        }
        return await uploadFormdataFile(file, uuid)
    }

    async getTrackByUuid(uuid: string): Promise<Track> {
        const track: Track = await this.trackRepository.findOne(uuid)
        if (track) {
            return track
        } else {
            throw new NotFoundException(`${ExceptionMessages.TRACK_NOT_FOUND}: UUID ${uuid}`)
        }
    }

    async addNewTrack(files: FormdataFile[], user: User): Promise<Track> {
        const createdTrack: Track = await this.createTrack(user)
        const trackUuid: string = createdTrack.uuid;

        for await (const file of files) {
            if (!(<any>Object).values(AllowedMimetypes).includes(file.mimetype)) {
                throw new UnsupportedMediaTypeException(ExceptionMessages.NOT_SUPPORTED_MIMETYPE)
            }
            const result: UploadingResult = await this.uploadFile(file, trackUuid)
            createdTrack.setField(result.fieldname, result.uri)
        }

        createdTrack.save()
        return createdTrack
    }

    async updateTrackInfo(updateTrackInfoDto: UpdateTrackInfoDto, uuid: string) {
        const track: Track = await this.getTrackByUuid(uuid)


    }
}
