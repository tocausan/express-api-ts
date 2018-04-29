import * as moment from 'moment';
import * as _ from 'lodash';
import {Config} from '../config';
import {User, Password, Token, DbClient} from '../models';
import {Translation} from "../translations";

export const UserServices = {

        isTokenValid: async (username: string, token: string): Promise<boolean> => {
            return DbClient.findOne(Config.database.collections.tokens, {username: username})
                .then((userToken: Token) => {
                    const now = moment.utc().format();
                    if (userToken &&
                        userToken.hash === token &&
                        userToken.expiration > now &&
                        userToken.creation <= now) return true;
                    else throw new Error(Translation[Config.language].INVALID_TOKEN);
                });
        },

        addUser: async (data: any): Promise<User> => {
            if (_.isNil(data) || _.isNil(data.username) || _.isNil(data.password)) throw new Error(Translation[Config.language].EMPTY_DATA);
            const user = new User(data);
            const password = new Password(data);
            return DbClient.insertOneIfNotExist(Config.database.collections.users, {username: user.username}, user.store())
                .then(() => {
                    return DbClient.insertOneIfNotExist(Config.database.collections.passwords, {userId: user.id}, password)
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

        getToken: async (username: string): Promise<Token> => {
            const user: User = await UserServices.getUser(username);
            return DbClient.findOne(Config.database.collections.tokens, {userId: user.id})
                .then((data: any) => {
                    return new Token(data);
                });
        },

        getPassword: async (username: string): Promise<Password> => {
            const user: User = await UserServices.getUser(username);
            return DbClient.findOne(Config.database.collections.passwords, {userId: user.id})
                .then((data: any) => {
                    return new Password(data);
                });
        },

        deletePassword: async (username: string): Promise<void> => {
            const user: User = await UserServices.getUser(username);
            return DbClient.findOneAndDelete(Config.database.collections.passwords, {userId: user.id});
        },

        deleteToken: async (username: string): Promise<void> => {
            const user: User = await UserServices.getUser(username);
            return DbClient.findOneAndDelete(Config.database.collections.tokens, {userId: user.id});
        }
    }
;
