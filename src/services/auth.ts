import * as _ from 'lodash';
import {Config} from '../config';
import {User, Password, Token, DbClient} from '../models';
import {Translation} from "../translations";

export const AuthServices = {

    signin: (username: string, password: string, passwordConfirmation: string): Promise<Token> => {
        return new Promise((resolve, reject) => {
            if (_.isNil(username) || _.isNil(password) || _.isNil(passwordConfirmation)) return reject(new Error('Missing data'));
            if (!Password.confirmNewPassword(password, passwordConfirmation)) return reject(new Error('Password not matching'));

            DbClient.insertOneIfNotExist(Config.database.collections.users, {username: username}, {
                username: username,
                password: password
            })
                .then(() => {
                    const pwd = new Password({
                            username: username,
                            password: password
                        }),
                        token = new Token({password: password});
                    DbClient.insertOne(Config.database.collections.passwords, pwd)
                        .then((pwdResult: any) => {
                            AuthServices.setToken(username, token)
                                .then((setTokenResult: Token) => {
                                    return resolve(setTokenResult);
                                }, (e: Error) => {
                                    return reject(e);
                                });
                        }, (e: Error) => {
                            return reject(e);
                        });
                }, (e: Error) => {
                    return reject(e);
                });

        });
    },

    login: (username: string, password: string): Promise<Token> => {
        return new Promise((resolve, reject) => {
            if (_.isNil(username) || _.isNil(password)) return reject(new Error('Missing data'));

            DbClient.findOne(Config.database.collections.passwords, {username: username})
                .then(findPasswordResult => {
                    let pwd = new Password(findPasswordResult);
                    pwd.comparePassword(password)
                        .then(comparePasswordResult => {
                            if (!comparePasswordResult) return reject(Translation[Config.language].INVALID_CREDENTIALS);
                            let token = new Token({
                                username: username,
                                password: password
                            });
                            AuthServices.setToken(username, token)
                                .then((setTokenResult: Token) => {
                                    resolve(setTokenResult);
                                }, (e: Error) => {
                                    return reject(e);
                                });
                        }, (e: Error) => {
                            return reject(e);
                        });
                }, (e: Error) => {
                    return reject(e);
                });

        });
    },

    setToken: (username: string, token: Token): Promise<Token> => {
        return new Promise((resolve, reject) => {
            DbClient.findOneAndUpdateOrInsert(Config.database.collections.tokens, {username: username}, token)
                .then(() => {
                    DbClient.findOne(Config.database.collections.users, {username: username})
                        .then((user: User) => {
                            user.token = token.token;
                            DbClient.findOneAndUpdate(Config.database.collections.users, {username: username}, user)
                                .then(() => {
                                    resolve(token);
                                }, (e: Error) => {
                                    return reject(e);
                                });
                        }, (e: Error) => {
                            return reject(e);
                        });
                }, (e: Error) => {
                    return reject(e);
                });
        });
    }
};
