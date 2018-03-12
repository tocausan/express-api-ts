import * as fs from 'fs';
import {DebugConsole} from "../models";
import {Path} from "../models";
import ErrnoException = NodeJS.ErrnoException;

const format = 'json';

export const JsonDataAccess = {

    writeJsonFile: (path: string, data: any): Promise<any> => {
        new DebugConsole('JsonDataAccess/writeJsonFile');
        return new Promise((resolve, reject) => {
            const stringifiedData = JSON.stringify(data, null, 2),
                dissectedPath = new Path(path);

            if (!fs.existsSync(dissectedPath.folderPath)) fs.mkdirSync(dissectedPath.folderPath);

            fs.writeFile(dissectedPath.toFormat(format), stringifiedData, (err: ErrnoException) => {
                err ? reject(err) : resolve(stringifiedData);
            });
        });
    },

    readFile: (path: string): Promise<any> => {
        new DebugConsole('JsonDataAccess/readFile');
        return new Promise((resolve, reject) => {
            const dissectedPath = new Path(path);

            if (dissectedPath.isFormat(format)) {
                fs.readFile(path, 'utf8', (err: Error, result: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        JSON.stringify(result) ? resolve(result) : reject('Expected json content');
                    }
                });
            } else {
                reject('Expected format "' + format + '" instead of "' + dissectedPath.fileName.format + '"');
            }
        });
    }
};