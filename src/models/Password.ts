import * as _ from 'lodash';
import {EncryptionServices} from "../services";
import {DebugConsole} from "./index";

export class Password {
    iterations: number;
    salt: string;
    username: string;
    password: string;
    hash: string;

    constructor(data?: any) {
        new DebugConsole('Password/constructor');
        this.iterations = !_.isNil(data) && !_.isNil(data.iterations) ? data.iterations : Math.floor(Math.random() * 1000);
        this.salt = !_.isNil(data) && !_.isNil(data.salt) ? data.salt : this.generateSalt();
        this.username = !_.isNil(data) && !_.isNil(data.username) ? data.username : '';
        this.password = !_.isNil(data) && !_.isNil(data.password) ? data.password : '';
        this.hash = !_.isNil(data) && !_.isNil(data.hash) ? data.hash : this.generateHash(this.password);
    };

    private generateSalt(): string {
        new DebugConsole('Password/generateSalt');
        return EncryptionServices.hash(EncryptionServices.randomSecret(this.iterations), this.iterations);
    };

    private generateHash(toHash: string): string {
        new DebugConsole('Password/generateHash');
        return EncryptionServices.hash(toHash, this.iterations);
    }

    public comparePassword(password: string): Promise<boolean> {
        new DebugConsole('Password/comparePassword');
        return new Promise((resolve, reject) => {
            resolve(this.generateHash(password) === this.hash);
        });
    }
}
