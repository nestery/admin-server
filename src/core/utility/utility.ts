import { normalize } from "path";
import { stat, mkdir, createWriteStream } from "fs";
import { FormdataFile } from "src/tracks/interfaces/formdata-file.interface";
import { UploadingResult } from "src/tracks/interfaces/uploading-result.interface";
import { Fieldnames } from "src/tracks/enums/fieldnames.enum";
import { Folders } from "src/tracks/enums/folders.enum";
import { promisify } from "util";
import { pipeline } from "stream";
const pump = promisify(pipeline)


export function replaceFileName(target: string, newName: string) {
    const ext = target.match(/\.[A-z0-9]+$/gi)
    if (ext.length) {
        return `${newName}${ext[0]}`
    }
    return target
}


export function ensurePath(directoryPath, options): Promise<string> {
    const createNonExistsFolder = options.create
    const directory = normalize(directoryPath);

    return new Promise(async (resolve, reject) => {
        try {
            await checkPath(directory)
            resolve(directory);
        } catch (error) {
            if (error.code === 'ENOENT' && createNonExistsFolder) {
                await createDirectory(directory)
                resolve(directory);
            } else {
                reject(error);
            }
        }
    });
}



export function checkPath(directoryPath): Promise<string> {
    const directory = normalize(directoryPath);

    return new Promise((resolve, reject) => {
        stat(directory, async (error) => {
            if (error) {
                reject(error);
            } else {
                resolve(directory);
            }
        });
    });
}


export function createDirectory(directoryPath) {
    const directory = normalize(directoryPath);

    return new Promise((resolve, reject) => {
        mkdir(directory, { recursive: true }, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve(directory);
            }
        });
    });
}

export async function uploadFormdataFile(part: FormdataFile, uuid: string): Promise<UploadingResult> {
    const fieldname: Fieldnames = part.fieldname
    const filename = replaceFileName(part.filename, uuid)
    const path = `${Folders.UPLOADS_ROOT}/${part.fieldname}`
    const uri = `${path}/${filename}`

    await ensurePath(path, { create: true })

    const uploadingResult: UploadingResult = {
        fieldname,
        uri
    }
    await pump(part.file, createWriteStream(uri))
    return uploadingResult
}

