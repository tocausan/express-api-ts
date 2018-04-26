import {Config} from '../config';
import {DatabaseDataAccess} from '../data-access';
import {User, Password, DebugConsole, Token} from '../models';
import {Translation} from "../translations";
import {EncryptionServices} from "./encryption";

export const UserServices = {

    isTokenValid: (token: Token): Promise<User> => {
        new DebugConsole('UserServices/isTokenValid');
        return new Promise((resolve, reject) => {
            console.log(token.isValid())
            if (token.isValid()) {
                UserServices.findOneByUsername(token.username).then((user: User) => {
                    if (user.token === token.token) {
                        return resolve(user);
                    } else {
                        return reject({message: Translation[Config.language].INVALID_TOKEN});
                    }
                });
            } else {
                return reject({message: Translation[Config.language].INVALID_TOKEN});
            }
        });
    },

    insertOne: (data: any): Promise<User> => {
        new DebugConsole('UserServices/insertOne');
        return new Promise((resolve, reject) => {
            if (data && data.username) {
                let user = new User(data);
                DatabaseDataAccess.insertOneIfNotExist(Config.database.collections.users, {username: user.username}, user).then((user: User) => {
                    data.password = data.password !== null && data.password !== undefined ? data.password : EncryptionServices.randomSecret(10);
                    let password = new Password(data);
                    if (user) {
                        DatabaseDataAccess.insertOneIfNotExist(Config.database.collections.passwords, {username: password.username}, password).then(() => {
                            resolve(user);
                        }, e => {
                            reject(e);
                        });
                    } else {
                        reject(new Error('User not inserted'));
                    }
                }, e => {
                    reject(e);
                });
            } else {
                reject(new Error(Translation[Config.language].EMPTY_DATA));
            }
        });
    },

    findAll: (): Promise<User[]> => {
        new DebugConsole('UserServices/findAll');
        return DatabaseDataAccess.find(Config.database.collections.users);
    },

    findOneByUsername: (username: string): Promise<User> => {
        new DebugConsole('UserServices/findOneByUsername');
        return <Promise<User>>DatabaseDataAccess.findOne(Config.database.collections.users, {username: username})
    },

    findOneAndUpdateByUsername: (username: string, update: string): Promise<User> => {
        new DebugConsole('UserServices/findOneAndUpdateByUsername');
        return DatabaseDataAccess.findOneAndUpdate(Config.database.collections.users, {username: username}, update);
    },

    findOneAndDeleteByUsername: (username: string): Promise<any> => {
        new DebugConsole('UserServices/findOneAndDeleteByUsername');
        return DatabaseDataAccess.findOneAndDelete(Config.database.collections.users, {username: username}).then(() => {
            return DatabaseDataAccess.findOneAndDelete(Config.database.collections.tokens, {username: username}).then(() => {
                return DatabaseDataAccess.findOneAndDelete(Config.database.collections.passwords, {username: username});
            });
        });
    }
};
