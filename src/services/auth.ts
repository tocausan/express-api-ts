import {Config} from '../config';
import {DatabaseDataAccess} from '../data-access';
import {User, Password, Token, DebugConsole} from '../models';
import {Translation} from "../translations";

export const AuthServices = {

    login: (data: any) => {
        new DebugConsole('AuthServices/login');
        return new Promise((resolve, reject) => {
            DatabaseDataAccess.findOne(Config.database.collections.passwords, {username: data.username}).then(passwordResult => {
                let password = new Password(passwordResult);
                password.comparePassword(data.password).then(compareResult => {
                    if (!compareResult) reject(Translation.INVALID_CREDENTIALS);
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
        new DebugConsole('AuthServices/signin');
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
