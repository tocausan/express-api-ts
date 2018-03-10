import * as mongoDb from 'mongodb';
import {Config} from '../config';

export const DatabaseDataAccess = {
    isConnected: (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            mongoDb.connect(Config.database.path, (err, database) => {
                if (err) reject(false);
                resolve(true);
            });
        });
    },
    insertMany: (collection: string, data: any): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(Config.database.path, (err, database) => {
                if (err) {
                    reject(err);
                } else {
                    database.db(Config.database.db).collection(collection).insertMany(data).then(result => {
                        resolve(data);
                        database.close();
                    }, e => {
                        reject(e);
                    });
                }

            });
        });
    },
    insertOne: (collection: string, data: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(Config.database.path, (err, database) => {
                if (err) {
                    reject(err);
                } else {
                    database.db(Config.database.db).collection(collection).insertOne(data).then(result => {
                        resolve(result);
                        database.close();
                    }, e => {
                        reject(e);
                    });
                }
            });
        });
    },
    insertOneIfNotExist: (collection: string, filter: any, data: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(Config.database.path, (err, database) => {
                if (err) {
                    reject(err);
                } else {
                    database.db(Config.database.db).collection(collection).findOne(filter).then(findResult => {
                        if (!findResult) {
                            database.db(Config.database.db).collection(collection).insertOne(data).then(() => {
                                resolve(data);
                            }, e => {
                                reject(e);
                            });
                        } else {
                            reject({
                                message: 'data already exist',
                                data: data
                            });
                        }
                    }, e => {
                        reject(e);
                    });
                }
            });
        });
    },
    find: (collection: string): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(Config.database.path, (err, database) => {
                if (err) {
                    reject(err);
                } else {
                    database.db(Config.database.db).collection(collection).find().toArray((error, result) => {
                        if (error) reject(error);
                        resolve(result);
                        database.close();
                    });
                }
            });
        });
    },
    findOne: (collection: string, filter: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(Config.database.path, (err, database) => {
                if (err) {
                    reject(err);
                } else {
                    database.db(Config.database.db).collection(collection).findOne(filter).then(result => {
                        resolve(result);
                        database.close();
                    }, e => {
                        reject(e);
                    });
                }
            });
        });
    },
    findOneAndUpdate: (collection: string, filter: any, update: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(Config.database.path, (err, database) => {
                if (err) {
                    reject(err);
                } else {
                    database.db(Config.database.db).collection(collection).findOneAndUpdate(filter, {$set: update}).then(result => {
                        resolve(result);
                        database.close();
                    }, e => {
                        reject(e);
                    });
                }
            });
        });
    },
    findOneAndUpdateOrInsert: (collection: string, filter: any, update: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(Config.database.path, (err, database) => {
                if (err) {
                    reject(err);
                } else {
                    database.db(Config.database.db).collection(collection).findOneAndUpdate(filter, {$set: update}).then(result => {
                        if (result) {
                            resolve(update);
                        } else {
                            database.db(Config.database.db).collection(collection).insertOne(update).then(() => {
                                resolve(update);
                            });
                        }
                        database.close();
                    }, e => {
                        reject(e);
                    });
                }
            });
        });
    },
    findOneAndDelete: (collection: string, filter: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            mongoDb.MongoClient.connect(Config.database.path, (err, database) => {
                if (err) {
                    reject(err);
                } else {
                    database.db(Config.database.db).collection(collection).findOneAndDelete(filter).then(result => {
                        resolve(result);
                        database.close();
                    }, e => {
                        reject(e);
                    });
                }
            });
        });
    }
};

