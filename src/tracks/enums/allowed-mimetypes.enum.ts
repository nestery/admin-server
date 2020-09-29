import { MimetypeAudio } from "src/core/enums/mimetype-audio.enum";
import { MimetypeImage } from "src/core/enums/mimetype-image.enum";

export const AllowedMimetypes = { ...MimetypeAudio, ...MimetypeImage };
export type AllowedMimetypes = typeof AllowedMimetypes;