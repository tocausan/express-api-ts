import {Config} from '../config';
import {User, Password, Token, DbClient} from '../models';
import {Translation} from "../translations";
import {EncryptionServices} from "./encryption";

export const UserServices = {

    isTokenValid: async (token: Token): Promise<User> => {
        if (token.isValid()) throw Translation[Config.language].INVALID_TOKEN;
        return UserServices.findOneByUsername(token.username);
    },

    insertOne: (data: any): Promise<User> => {
        return new Promise((resolve, reject) => {
            if (data && data.username) {
                let user = new User(data);
                DbClient.insertOneIfNotExist(Config.database.collections.users, {username: user.username}, user)
                    .then((user: User) => {
                        data.password = data.password !== null && data.password !== undefined ? data.password : EncryptionServices.randomSecret(10);
                        let password = new Password(data);
                        if (!user) reject(new Error('User not inserted'));
                        DbClient.insertOneIfNotExist(Config.database.collections.passwords, {username: password.username}, password)
                            .then(() => {
                                return resolve(user);
                            }, (e: Error) => {
                                return reject(e);
                            });
                    }, (e: Error) => {
                        return reject(e);
                    });
            } else {
                reject(new Error(Translation[Config.language].EMPTY_DATA));
            }
        });
    },

    findAll: (): Promise<User[]> => {
        return DbClient.find(Config.database.collections.users);
    },

    findOneByUsername: (username: string): Promise<User> => {
        return <Promise<User>>DbClient.findOne(Config.database.collections.users, {username: username})
    },

    findOneAndUpdateByUsername: (username: string, update: string): Promise<User> => {
        return DbClient.findOneAndUpdate(Config.database.collections.users, {username: username}, update);
    },

    findOneAndDeleteByUsername: (username: string): Promise<any> => {
        return DbClient.findOneAndDelete(Config.database.collections.users, {username: username})
            .then(() => {
                return DbClient.findOneAndDelete(Config.database.collections.tokens, {username: username})
                    .then(() => {
                        return DbClient.findOneAndDelete(Config.database.collections.passwords, {username: username});
                    });
            });
    }
};
