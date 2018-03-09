import {Config} from '../config';
import {DatabaseDataAccess} from '../data-access';
import {User, Password} from '../models';

export const UserServices = {
    insertOne: function (data: any) {
        return new Promise((resolve, reject) => {
            if (!data) reject('empty data');

            let user = new User(data);
            DatabaseDataAccess.insertOneIfNotExist(Config.database.collections.users, {username: user.username}, user).then(result => {
                let password = new Password(data);
                password.hashPassword().then(() => {
                    if (result) DatabaseDataAccess.insertOneIfNotExist(Config.database.collections.passwords, {username: password.username}, password).then(result => {
                        //console.log(result)
                        resolve(user);
                    }, e => {
                        console.log(e);
                    });
                });
            }, e => {
                console.log(e);
            });
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
