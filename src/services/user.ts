import * as moment from 'moment';
import * as _ from 'lodash';
import {Config} from '../config';
import {User, Password, Token, DbClient} from '../models';
import {Translation} from "../translations";

export const UserServices = {

        isTokenValid: async (username: string, token: string): Promise<boolean> => {
            const userToken: Token = await UserServices.getToken(username);
            const now = moment.utc().format();
            if (userToken &&
                userToken.hash === token &&
                userToken.expiration > now &&
                userToken.creation <= now) return true;
            else throw new Error(Translation[Config.language].INVALID_TOKEN);
        },

        addUser: async (data: any): Promise<User> => {
            if (_.isNil(data) || _.isNil(data.username) || _.isNil(data.password)) throw new Error(Translation[Config.language].EMPTY_DATA);
            try {
                let user: User = new User(data);
                user = new User(await DbClient.insertOneIfNotExist(Config.database.collections.users, {username: user.username}, user.store()));
                await UserServices.setPassword(data.username, data.password);
                await UserServices.setToken(data.username);
                return user;
            } catch (err) {
                throw err;
            }
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

        updateUser: async (username: string, update: any): Promise<User> => {
            const user: User = await UserServices.getUser(username);
            return new User(await (DbClient.findOneAndUpdate(Config.database.collections.users, {_id: user.id}, update)))
        },

        deleteUser: async (username: string): Promise<void> => {
            try {
                await DbClient.findOneAndDelete(Config.database.collections.users, {username: username})
                await UserServices.deletePassword(username);
                await UserServices.deleteToken(username);
            } catch (err) {
                throw err;
            }
        },

        setPassword: async (username: string, password: string): Promise<Password> => {
            const user: User = await UserServices.getUser(username);
            const psswrd: Password = new Password({
                userId: user.id,
                password: password
            });
            return await DbClient.insertOneIfNotExist(Config.database.collections.passwords, {userId: user.id}, psswrd);
        },

        getPassword: async (username: string): Promise<Password> => {
            const user: User = await UserServices.getUser(username);
            return new Password(await DbClient.findOne(Config.database.collections.passwords, {userId: user.id}));
        },

        deletePassword: async (username: string): Promise<void> => {
            const user: User = await UserServices.getUser(username);
            return DbClient.findOneAndDelete(Config.database.collections.passwords, {userId: user.id});
        },

        setToken: async (username: string) => {
            const user: User = await UserServices.getUser(username);
            const token = new Token({userId: user.id});
            return DbClient.findOneAndUpdateOrInsert(Config.database.collections.tokens, {userId: user.id}, token);
        },

        deleteToken: async (username: string): Promise<void> => {
            const user: User = await UserServices.getUser(username);
            return DbClient.findOneAndDelete(Config.database.collections.tokens, {userId: user.id});
        },

        getToken: async (username: string): Promise<Token> => {
            const user: User = await UserServices.getUser(username);
            return new Token(await DbClient.findOne(Config.database.collections.tokens, {userId: user.id}));
        }
    }
;
