import * as moment from 'moment';
import * as _ from 'lodash';
import {Config} from '../config';
import {User, Password, Token, DbClient} from '../models';
import {Translation} from "../translations";

export const UserServices = {

        isTokenValid: async (username: string, token: string): Promise<void> => {
            return DbClient.findOne(Config.database.collections.tokens, {username: username})
                .then((userToken: Token) => {
                    const now = moment.utc().format();
                    if (userToken &&
                        userToken.hash === token &&
                        userToken.expiration > now &&
                        userToken.creation <= now) return;
                    else throw new Error(Translation[Config.language].INVALID_TOKEN);
                });
        },

        addUser: async (data: any): Promise<User> => {
            if (_.isNil(data) || _.isNil(data.username) || _.isNil(data.password)) throw new Error(Translation[Config.language].EMPTY_DATA);
            const user = new User(data);
            const password = new Password(data);
            return DbClient.insertOneIfNotExist(Config.database.collections.users, {username: user.username}, user)
                .then((user: User) => {
                    return DbClient.insertOneIfNotExist(Config.database.collections.passwords, {username: password.username}, password)
                        .then(() => {
                            return user;
                        });
                });

        },

        getUsers: (): Promise<User[]> => {
            return DbClient.find(Config.database.collections.users)
                .then((data: any[]) => {
                    return data.map((userData: any) => {
                        return new User(userData);
                    });
                });
        },

        getUser: (username: string): Promise<User> => {
            return DbClient.findOne(Config.database.collections.users, {username: username})
                .then((data: any) => {
                    return new User(data);
                });
        },

        updateUser: (username: string, update: string): Promise<User> => {
            return DbClient.findOneAndUpdate(Config.database.collections.users, {username: username}, update)
                .then((data: any) => {
                    return new User(data);
                });
        },

        deleteUser: (username: string): Promise<void> => {
            return DbClient.findOneAndDelete(Config.database.collections.users, {username: username})
                .then(() => {
                    UserServices.deletePassword(username)
                        .then(() => {
                            return UserServices.deleteToken(username);
                        });
                });
        },

        getToken: (username: string): Promise<Token> => {
            return DbClient.findOne(Config.database.collections.tokens, {username: username})
                .then((data: any) => {
                    return new Token(data);
                });
        },

        getPassword: (username: string): Promise<Password> => {
            return DbClient.findOne(Config.database.collections.passwords, {username: username})
                .then((data: any) => {
                    return new Password(data);
                });
        },

        deletePassword: (username: string): Promise<void> => {
            return DbClient.findOneAndDelete(Config.database.collections.passwords, {username: username});
        },

        deleteToken: (username: string): Promise<void> => {
            return DbClient.findOneAndDelete(Config.database.collections.tokens, {username: username});
        }
    }
;
