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
        const client: any = await this.connect();
        await client.db(Config.database.db);
        client.close();
        return data;
    }

    static async insertOne(collection: string, data: any): Promise<any> {
        const client: any = await this.connect();
        await client.db(Config.database.db)
            .collection(collection)
            .insertOne(data);
        client.close();
        return data;
    }

    static async insertOneIfNotExist(collection: string, filter: any, data: any): Promise<any> {
        const client: any = await this.connect();
        const result: any = await client.db(Config.database.db)
            .collection(collection)
            .findOne(filter);
        if (result) throw new Error('data already exist');
        await this.insertOne(collection, data);
        return data;
    }

    static async find(collection: string): Promise<any[]> {
        const client: any = await this.connect();
        return await client.db(Config.database.db)
            .collection(collection)
            .find()
            .toArray();
    }

    static async findOne(collection: string, filter: any): Promise<any> {
        const client: any = await this.connect();
        const result: any = await client.db(Config.database.db)
            .collection(collection)
            .findOne(filter);
        client.close();
        return result;
    }

    static async findOneAndUpdate(collection: string, filter: any, update: any): Promise<any> {
        const client: any = await this.connect();
        const result: any = await client.db(Config.database.db)
            .collection(collection)
            .findOneAndUpdate(filter, {$set: update});
        client.close();
        return result;
    }

    static async findOneAndUpdateOrInsert(collection: string, filter: any, update: any): Promise<any> {
        const result: any = await this.findOne(collection, filter);
        if (result) return this.findOneAndUpdate(collection, filter, update);
        else return this.insertOne(collection, update);
    }

    static async findOneAndDelete(collection: string, filter: any): Promise<any> {
        const client: any = await this.connect();
        const result: any = await client.db(Config.database.db)
            .collection(collection)
            .findOneAndDelete(filter);
        client.close();
        return result;
    }
}