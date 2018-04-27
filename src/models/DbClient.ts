import {Config} from "../config";
import * as mongoDb from "mongodb";
import {ErrorApi} from "./index";

export class DbClient {

    static isConnected(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            mongoDb.connect(Config.database.path, (err) => {
                if (err) return reject(false);
                return resolve(true);
            });
        });
    }

    static insertMany(collection: string, data: any): Promise<any[]> {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(Config.database.path, (err, client) => {
                if (err) return reject(err);
                client.db(Config.database.db).collection(collection).insertMany(data).then(result => {
                    client.close();
                    return resolve(data);
                }, e => reject(e));
            });
        });
    }

    static insertOne(collection: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(Config.database.path, (err, client) => {
                if (err) return reject(err);
                client.db(Config.database.db).collection(collection).insertOne(data).then(result => {
                    client.close();
                    return resolve(result);
                }, e => reject(e));
            });
        });
    }

    static insertOneIfNotExist(collection: string, filter: any, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(Config.database.path, (err, client) => {
                if (err) return reject(err);
                client.db(Config.database.db).collection(collection).findOne(filter).then(findResult => {
                    if (findResult) return reject(new ErrorApi(500, 'data already exist'));
                    return this.insertOne(collection, data)
                        .then(() => {
                            return resolve(data);
                        }, e => reject(e));
                }, e => reject(e));
            });
        });
    }

    static find(collection: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(Config.database.path, (err, client) => {
                if (err) return reject(err);
                client.db(Config.database.db).collection(collection).find().toArray((error, result) => {
                    if (error) return reject(error);
                    client.close();
                    return resolve(result);
                });
            });
        });
    }

    static findOne(collection: string, filter: any): Promise<any> {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(Config.database.path, (err, client) => {
                if (err) return reject(err);
                client.db(Config.database.db).collection(collection).findOne(filter).then(result => {
                    client.close();
                    return resolve(result);
                }, e => reject(e));
            });
        });
    }

    static findOneAndUpdate(collection: string, filter: any, update: any): Promise<any> {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(Config.database.path, (err, client) => {
                if (err) return reject(err);
                client.db(Config.database.db).collection(collection).findOneAndUpdate(filter, {$set: update}).then(result => {
                    client.close();
                    return resolve(result);
                }, e => reject(e));
            });
        });
    }

    static findOneAndUpdateOrInsert(collection: string, filter: any, update: any): Promise<any> {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(Config.database.path, (err, client) => {
                if (err) return reject(err);
                client.db(Config.database.db).collection(collection).findOneAndUpdate(filter, {$set: update}).then(result => {
                    if (result) return resolve(update);
                    client.db(Config.database.db).collection(collection).insertOne(update).then(() => {
                        client.close();
                        return resolve(update);
                    });
                }, e => reject(e));
            });
        });
    }

    static findOneAndDelete(collection: string, filter: any): Promise<any> {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(Config.database.path, (err, client) => {
                if (err) return reject(err);
                client.db(Config.database.db)
                    .collection(collection)
                    .findOneAndDelete(filter)
                    .then((result: any) => {
                        client.close();
                        return resolve(result);
                    }, e => reject(e));
            });
        });
    }
}