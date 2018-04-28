import {Config} from "../config";
import {MongoClient} from "mongodb";

export class DbClient {

    static async connect(): Promise<any> {
        return new Promise((resolve, reject) => {
            MongoClient.connect(Config.database.path, (err: Error, client: any) => {
                if (err) return reject(err);
                return resolve(client);
            });
        });
    }

    static async isConnected(): Promise<boolean> {
        return this.connect()
            .then((client: any) => {
                client.close();
                return true;
            })
            .catch(() => {
                return false;
            });
    }

    static async insertMany(collection: string, data: any[]): Promise<any[]> {
        return this.connect()
            .then((client: any) => {
                return client.db(Config.database.db)
                    .collection(collection)
                    .insertMany(data)
                    .then(() => {
                        client.close();
                        return data;
                    });
            });
    }

    static async insertOne(collection: string, data: any): Promise<any> {
        return this.connect()
            .then((client: any) => {
                client.db(Config.database.db)
                    .collection(collection)
                    .insertOne(data).then((result: any) => {
                    client.close();
                    return result;
                });
            });
    }

    static async insertOneIfNotExist(collection: string, filter: any, data: any): Promise<any> {
        return this.connect()
            .then((client: any) => {
                return client.db(Config.database.db)
                    .collection(collection)
                    .findOne(filter)
                    .then((result: any) => {
                        if (result) throw new Error('data already exist');
                        return this.insertOne(collection, data)
                            .then(() => {
                                return data;
                            });
                    });
            });
    }

    static async find(collection: string): Promise<any[]> {
        return this.connect()
            .then((client: any) => {
                return client.db(Config.database.db)
                    .collection(collection)
                    .find()
                    .toArray((err: Error, result: any) => {
                        if (err) throw err;
                        client.close();
                        return result;
                    });
            });
    }

    static async findOne(collection: string, filter: any): Promise<any> {
        return this.connect()
            .then((client: any) => {
                return client.db(Config.database.db)
                    .collection(collection)
                    .findOne(filter)
                    .then((result: any) => {
                        client.close();
                        return result;
                    });
            });
    }

    static async findOneAndUpdate(collection: string, filter: any, update: any): Promise<any> {
        return this.connect()
            .then((client: any) => {
                client.db(Config.database.db)
                    .collection(collection)
                    .findOneAndUpdate(filter, {$set: update})
                    .then((result: any) => {
                        client.close();
                        return result;
                    });
            });
    }

    static async findOneAndUpdateOrInsert(collection: string, filter: any, update: any): Promise<any> {
        return this.connect()
            .then(() => {
                this.findOne(collection, filter)
                    .then(async (result: any) => {
                        if (result) return this.findOneAndUpdate(collection, filter, update);
                        else return this.insertOne(collection, update);
                    });
            });
    }

    static async findOneAndDelete(collection: string, filter: any): Promise<any> {
        return this.connect()
            .then((client: any) => {
                return client.db(Config.database.db)
                    .collection(collection)
                    .findOneAndDelete(filter);
            });
    }
}