import {Config} from "../config";
import * as mongoDb from "mongodb";
import {ErrorApi} from "./index";

export class DbClient {

    static isConnected(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            mongoDb.connect(Config.database.path, (err) => {
                if (err) reject(false);
                resolve(true);
            });
        });
    }

    static insertMany(collection: string, data: any): Promise<any[]> {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(Config.database.path, (err, client) => {
                if (err) reject(err);
                client.db(Config.database.db).collection(collection).insertMany(data).then(result => {
                    resolve(data);
                    client.close();
                }, e => reject(e));
            });
        });
    }

    static insertOne(collection: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(Config.database.path, (err, client) => {
                if (err) reject(err);
                client.db(Config.database.db).collection(collection).insertOne(data).then(result => {
                    resolve(result);
                    client.close();
                }, e => reject(e));
            });
        });
    }

    static insertOneIfNotExist(collection: string, filter: any, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(Config.database.path, (err, client) => {
                if (err) reject(err);
                client.db(Config.database.db).collection(collection).findOne(filter).then(findResult => {
                    if (findResult) reject(new ErrorApi(500, 'data already exist'));
                    this.insertOne(collection, data).then(() => {
                        resolve(data);
                    }, e => reject(e));
                }, e => reject(e));
            });
        });
    }

    static find(collection: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(Config.database.path, (err, client) => {
                if (err) reject(err);
                client.db(Config.database.db).collection(collection).find().toArray((error, result) => {
                    if (error) reject(error);
                    resolve(result);
                    client.close();
                });
            });
        });
    }

    static findOne(collection: string, filter: any): Promise<any> {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(Config.database.path, (err, client) => {
                if (err) reject(err);
                client.db(Config.database.db).collection(collection).findOne(filter).then(result => {
                    resolve(result);
                    client.close();
                }, e => reject(e));
            });
        });
    }

    static findOneAndUpdate(collection: string, filter: any, update: any): Promise<any> {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(Config.database.path, (err, client) => {
                if (err) reject(err);
                client.db(Config.database.db).collection(collection).findOneAndUpdate(filter, {$set: update}).then(result => {
                    resolve(result);
                    client.close();
                }, e => reject(e));
            });
        });
    }

    static findOneAndUpdateOrInsert(collection: string, filter: any, update: any): Promise<any> {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(Config.database.path, (err, client) => {
                if (err) reject(err);
                client.db(Config.database.db).collection(collection).findOneAndUpdate(filter, {$set: update}).then(result => {
                    if (result) resolve(update);
                    client.db(Config.database.db).collection(collection).insertOne(update).then(() => {
                        resolve(update);
                    });
                    client.close();
                }, e => reject(e));
            });
        });
    }

    static findOneAndDelete(collection: string, filter: any): Promise<any> {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(Config.database.path, (err, client) => {
                if (err) reject(err);
                client.db(Config.database.db)
                    .collection(collection)
                    .findOneAndDelete(filter)
                    .then((result: any) => {
                        resolve(result);
                        client.close();
                    }, e => reject(e));
            });
        });
    }
}