import { Repository, EntityRepository } from "typeorm";
import { Track } from "./track.entity";
import { User } from "src/auth/user.entity";


@EntityRepository(Track)
export class TrackRepository extends Repository<Track>{

    async createTrack(user: User) {
        const track = new Track()
        track.user = user
        await track.save()
        return track
    }
}