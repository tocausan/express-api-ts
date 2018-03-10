import * as fs from 'fs';
import * as _ from 'lodash';
import {DebugConsole} from "../models";

export const JsonDataAccess = {
    writeJsonFile: (path: string, data: any): Promise<any> => {
        new DebugConsole('JsonDataAccess/writeJsonFile');
        return new Promise((resolve, reject) => {

            JSON.stringify(data) ? reject('Expected json content') : null;

            let folderPath = data.slice(0, data.length - 1);
            !fs.existsSync(folderPath) ? fs.mkdirSync(folderPath) : null;

            fs.writeFile(path + '.json', JSON.stringify(data, null, 4), (err: any) => {
                err ? reject(err) : resolve(data);
            });
        });
    },
    readFile: (path: string): Promise<any> => {
        new DebugConsole('JsonDataAccess/readFile');
        return new Promise((resolve, reject) => {
            let fileFormat: string = _.last(path.split('.'));
            fileFormat !== 'json' ? reject('This is not \'.json\' file') : null;

            fs.readFile(path, 'utf8', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    !JSON.stringify(result) ? reject('Expected json content') : null;
                    resolve(result);
                }
            });
        })
    }
};