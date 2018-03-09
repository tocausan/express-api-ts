import * as _ from 'lodash';
import * as crypto from 'crypto';

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
        this.passwordAttempt = !_.isNil(data) && !_.isNil(data.passwordAttempt) ? data.passwordAttempt : '';
        this.hash = !_.isNil(data) && !_.isNil(data.hash) ? data.hash : '';
    };

    generateSalt(): string {
        return crypto.randomBytes(this.iterations).toString('base64');
    };

    hashPassword(): Promise<string> {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(this.password, this.salt, this.iterations, 512, 'sha512', (err, result) => {
                if (err) reject(err);
                this.hash = result.toString('base64');
                resolve(result.toString('base64'));
            });
        });
    };

    comparePassword(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(this.passwordAttempt, this.salt, this.iterations, 512, 'sha512', (err, result) => {
                if (err) reject(err);
                if (_.isEmpty(this.hash)) console.log('Password hash is empty');
                resolve(this.hash === result.toString('base64'));
            });
        });
    }
}
