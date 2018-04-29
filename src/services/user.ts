import * as moment from 'moment';
import * as _ from 'lodash';
import {Config} from '../config';
import {User, Password, Token, DbClient} from '../models';
import {Translation} from "../translations";

export const UserServices = {

        isTokenValid: async (username: string, token: string): Promise<boolean> => {
            const userToken: Token = await DbClient.findOne(Config.database.collections.tokens, {username: username});
            const now = moment.utc().format();
            if (userToken &&
                userToken.hash === token &&
                userToken.expiration > now &&
                userToken.creation <= now) return true;
            else throw new Error(Translation[Config.language].INVALID_TOKEN);
        },

        addUser: async (data: any): Promise<User> => {
            if (_.isNil(data) || _.isNil(data.username) || _.isNil(data.password)) throw new Error(Translation[Config.language].EMPTY_DATA);
            let user: User = new User(data);
            user = new User(await DbClient.insertOneIfNotExist(Config.database.collections.users, {username: user.username}, user.store()));
            const password: Password = new Password(data);
            password.userId = user.id;
            await DbClient.insertOneIfNotExist(Config.database.collections.passwords, {userId: user.id}, password);
            return user;
        },

        getUsers: async (): Promise<User[]> => {
            return (await DbClient.find(Config.database.collections.users))
                .map((userData: any) => {
                    return new User(userData);
                });
        },

        getUser: async (username: string): Promise<User> => {
            return new User((await DbClient.findOne(Config.database.collections.users, {username: username})));
        },

        updateUser: async (username: string, update: string): Promise<User> => {
            return new User(await (DbClient.findOneAndUpdate(Config.database.collections.users, {username: username}, update)))
        },

        deleteUser: async (username: string): Promise<void> => {
            await DbClient.findOneAndDelete(Config.database.collections.users, {username: username});
            await UserServices.deletePassword(username);
            await UserServices.deleteToken(username);
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
