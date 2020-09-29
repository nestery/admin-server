import { MimetypeAudio } from "src/core/enums/mimetype-audio.enum";
import { MimetypeImage } from "src/core/enums/mimetype-image.enum";

export const Mimetypes = { ...MimetypeAudio, ...MimetypeImage };
export type Mimetypes = typeof Mimetypes;