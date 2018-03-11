import {Config} from '../config';
import {DatabaseDataAccess} from '../data-access';
import {User, Password, Token, DebugConsole} from '../models';
import {Translation} from "../translations";

export const AuthServices = {

    signin: (data: any) => {
        new DebugConsole('AuthServices/signin');
        return new Promise((resolve, reject) => {
            DatabaseDataAccess.insertOneIfNotExist(Config.database.collections.users, {username: data.username}, data).then(() => {
                let password = new Password(data);
                password.password = null;
                let token = new Token(data);
                AuthServices.setToken(data.username, token).then((setTokenResult: Token) => {
                    resolve(setTokenResult);
                }, e => {
                    reject(e);
                });
            }, e => {
                reject(e);
            });
        });
    },

    login: (data: any) => {
        new DebugConsole('AuthServices/login');
        return new Promise((resolve, reject) => {
            DatabaseDataAccess.findOne(Config.database.collections.passwords, {username: data.username}).then(findPasswordResult => {
                let password = new Password(findPasswordResult);
                password.comparePassword(data.password).then(comparePasswordResult => {
                    if (!comparePasswordResult) reject(Translation[Config.language].INVALID_CREDENTIALS);
                    let token = new Token(data);
                    AuthServices.setToken(data.username, token).then((setTokenResult: Token) => {
                        resolve(setTokenResult);
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

    setToken: (username: string, token: Token) => {
        return new Promise((resolve, reject) => {
            DatabaseDataAccess.findOneAndUpdateOrInsert(Config.database.collections.tokens, {username: username}, token).then(() => {
                DatabaseDataAccess.findOne(Config.database.collections.users, {username: username}).then((user: User) => {
                    user.token = token.token;
                    DatabaseDataAccess.findOneAndUpdate(Config.database.collections.users, {username: username}, user).then(() => {
                        resolve(token);
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
