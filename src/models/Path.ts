import {File} from "./File";

export class Path {
    fileName: File;
    folderPath: string;

    constructor(path: string) {
        const splittedPath = path.split('/');
        this.fileName = new File(splittedPath[splittedPath.length - 1]);
        this.folderPath = splittedPath.slice(0, splittedPath.length - 1).join('/');
    }

    isFormat(format: string) {
        return this.fileName.isFormat(format);
    }

    toFormat(format: string) {
        this.fileName.toFormat(format);
        return this.getFullPath()
    }

    getFullPath() {
        return this.folderPath + '/' + this.fileName.getFullName();
    }
}
