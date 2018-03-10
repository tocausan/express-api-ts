import {Config} from '../config';
import {DatabaseDataAccess} from '../data-access';
import {User, Password} from '../models';
import {Translation} from "../translations";
import {ErrorApi} from "../models/Error";
import {EncryptionServices} from "./encryption";

export const UserServices = {

    insertOne: function (data: any) {
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
        return DatabaseDataAccess.find(Config.database.collections.users);
    },

    findOneByUsername: function (username: string) {
        return DatabaseDataAccess.findOne(Config.database.collections.users, {username: username})
    },

    findOneAndUpdateByUsername: function (username: string, update: string) {
        return DatabaseDataAccess.findOneAndUpdate(Config.database.collections.users, {username: username}, update);
    },

    findOneAndDeleteByUsername: function (username: string) {
        return DatabaseDataAccess.findOneAndDelete(Config.database.collections.users, {username: username});
    }
};
