import * as _ from 'lodash';
import {EncryptionServices} from "../services";

export class Password {
    iterations: number;
    salt: string;
    username: string;
    password: string;
    passwordAttempt: string;
    hash: string;

    constructor(data: any) {
        this.iterations = !_.isNil(data) && !_.isNil(data.iterations) ? data.iterations : Math.floor(Math.random() * 1000);
        this.salt = !_.isNil(data) && !_.isNil(data.salt) ? data.salt : this.generateSalt();
        this.username = !_.isNil(data) && !_.isNil(data.username) ? data.username : '';
        this.password = !_.isNil(data) && !_.isNil(data.password) ? data.password : '';
        this.hash = !_.isNil(data) && !_.isNil(data.hash) ? data.hash : this.generateHash(this.password);
    };

    generateSalt(): string {
        return EncryptionServices.hash(EncryptionServices.randomSecret(this.iterations), this.iterations);
    };

    generateHash(toHash: string): string {
        return EncryptionServices.hash(toHash, this.iterations);
    }

    comparePassword(password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(this.generateHash(password) === this.hash);
        });
    }
}
