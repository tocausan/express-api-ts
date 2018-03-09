import {Config} from '../config';
import {DatabaseDataAccess} from '../data-access';
import {User, Password, Token} from '../models';

export const AuthServices = {
    authenticateCredential: (data: any) => {
        return new Promise((resolve, reject) => {
            DatabaseDataAccess.findOne(Config.database.collections.passwords, {username: data.username}).then(passwordResult => {
                if (!passwordResult) reject('invalid credentials');
                let password = new Password(passwordResult);
                password.passwordAttempt = data.password;
                password.comparePassword().then(compareResult => {
                    if (!compareResult) reject('invalid credentials');
                    let token = new Token(data);
                    DatabaseDataAccess.findOneAndUpdateOrInsert(Config.database.collections.tokens, {username: data.username}, token).then(tokenResult => {
                        resolve(tokenResult);
                    }, e => {
                        reject(e);
                    });
                }, e => {
                    reject(e);
                });
            }, e => {
                reject(e);
            })
        });
    },
    signin: (data: any) => {
        return new Promise((resolve, reject) => {
            let user = new User(data);
            DatabaseDataAccess.insertOneIfNotExist(Config.database.collections.users, {username: user.username}, user).then(() => {
                let password = new Password(data);
                password.password = null;
                DatabaseDataAccess.insertOneIfNotExist(Config.database.collections.passwords, {username: password.username}, password).then(() => {
                    let token = new Token(data);
                    DatabaseDataAccess.insertOneIfNotExist(Config.database.collections.tokens, {username: data.username}, token).then(tokenResult => {
                        resolve(tokenResult);
                    }, e => {
                        reject(e);
                    });
                }, e => {
                    reject(e);
                });
            }, e => {
                reject(e);
            });
        });
    }
};
