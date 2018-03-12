export class File {
    name: string;
    format: string;

    constructor(fileName: string) {
        const splittedfileName = fileName.split('.');
        this.name = splittedfileName[0];
        this.format = splittedfileName.slice(1, splittedfileName.length).join('.');
    }

    isFormat(format: string) {
        return this.format === format;
    }

    toFormat(format: string) {
        this.format = this.format === format ? this.format : this.format + '.' + format;
    }

    getFullName() {
        return this.name + '.' + this.format
    }
}
