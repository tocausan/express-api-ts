import {Config} from '../config';
import {DatabaseDataAccess} from '../data-access';
import {User, Password, DebugConsole} from '../models';
import {Translation} from "../translations";
import {EncryptionServices} from "./encryption";

export const UserServices = {

    insertOne: function (data: any) {
        new DebugConsole('UserServices/insertOne');
        return new Promise((resolve, reject) => {
            if (data && data.username) {
                let user = new User(data);
                DatabaseDataAccess.insertOneIfNotExist(Config.database.collections.users, {username: user.username}, user).then(result => {
                    data.password = EncryptionServices.randomSecret(10);
                    console.log(data)

                    let password = new Password(data);
                    if (result) DatabaseDataAccess.insertOneIfNotExist(Config.database.collections.passwords, {username: password.username}, password).then(() => {
                        resolve(user);
                    }, e => {
                        reject(e);
                    });
                }, e => {
                    reject(e);
                });
            } else {
                reject({message: Translation.EMPTY_DATA});
            }
        });
    },

    findAll: function () {
        new DebugConsole('UserServices/findAll');
        return DatabaseDataAccess.find(Config.database.collections.users);
    },

    findOneByUsername: function (username: string) {
        new DebugConsole('UserServices/findOneByUsername');
        return DatabaseDataAccess.findOne(Config.database.collections.users, {username: username})
    },

    findOneAndUpdateByUsername: function (username: string, update: string) {
        new DebugConsole('UserServices/findOneAndUpdateByUsername');
        return DatabaseDataAccess.findOneAndUpdate(Config.database.collections.users, {username: username}, update);
    },

    findOneAndDeleteByUsername: function (username: string) {
        new DebugConsole('UserServices/findOneAndDeleteByUsername');
        return DatabaseDataAccess.findOneAndDelete(Config.database.collections.users, {username: username});
    }
};
