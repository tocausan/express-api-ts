import * as _ from 'lodash';
import {EncryptionServices} from "../services";

export class Password {
    username: string;
    iterations: number;
    salt: string;
    hash: string;

    constructor(data?: any) {
        const password = !_.isNil(data) && !_.isNil(data.password) ? data.password : '';

        this.username = !_.isNil(data) && !_.isNil(data.username) ? data.username : '';
        this.iterations = !_.isNil(data) && !_.isNil(data.iterations) ? data.iterations : Math.floor(Math.random() * 1000);
        this.salt = !_.isNil(data) && !_.isNil(data.salt) ? data.salt : this.generateSalt();
        this.hash = !_.isNil(data) && !_.isNil(data.hash) ? data.hash : this.generateHash(password);
    };

    private generateSalt(): string {
        return EncryptionServices.hash(EncryptionServices.randomSecret(this.iterations), this.iterations);
    };

    private generateHash(toHash: string): string {
        return EncryptionServices.hash(toHash, this.iterations);
    }

    public async comparePassword(password: string): Promise<boolean> {
        return this.generateHash(password) === this.hash
    }

    static confirmNewPassword(password: string, passwordConfirmation: string): boolean {
        return password === passwordConfirmation;
    }
}