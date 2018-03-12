import {expect} from 'chai';
import * as moment from 'moment';
import {DatabaseDataAccess} from "../../data-access";
import {Config} from "../../config";

describe('DatabaseDataAccess', () => {

    describe('isConnected', () => {
        it('should return a boolean and true', () => {
            DatabaseDataAccess.isConnected()
                .then((result: boolean) => {
                    expect(result)
                        .to.be.a('boolean')
                        .to.equal(true)
                })
                .catch((result: any) => {
                    console.log(result);
                })
        });
    });

    describe('insertMany', () => {
        it('should return an object', () => {
            DatabaseDataAccess.insertMany(Config.database.collections.test, [{
                test: 'insertMany',
                date: moment().format()
            }])
                .then((result: object) => {
                    if (result) {
                        expect(result)
                            .to.be.a('array')
                    }
                })
                .catch((result: any) => {
                    console.log(result);
                })
        });
    });

    describe('insertOne', () => {
        it('should return an object', () => {
            DatabaseDataAccess.insertOne(Config.database.collections.test, {
                test: 'insertOne',
                date: moment().format()
            })
                .then((result: object) => {
                    if (result) {
                        expect(result)
                            .to.be.a('object')
                    }
                })
                .catch((result: any) => {
                    console.log(result);
                })
        });
    });

    describe('insertOneIfNotExist', () => {
        it('should return an object', () => {
            let test = {test: 'insertOneIfNotExist', date: moment().format()};
            DatabaseDataAccess.insertOneIfNotExist(Config.database.collections.test, test, test)
                .then((result: object) => {
                    if (result) {
                        expect(result)
                            .to.be.a('object')
                    }
                })
                .catch((result: any) => {
                    console.log(result);
                })
        });
    });

    describe('find', () => {
        it('should return an array', () => {
            DatabaseDataAccess.find(Config.database.collections.test)
                .then(result => {
                    expect(result)
                        .to.be.a('array')

                })
                .catch((result: any) => {
                    console.log(result);
                })
        });
    });

    describe('findOne', () => {
        it('should return an object', () => {
            DatabaseDataAccess.findOne(Config.database.collections.test, {test: 'insertOne'})
                .then(result => {
                    if (result) {
                        expect(result)
                            .to.be.a('object')
                    }
                })
                .catch((result: any) => {
                    console.log(result);
                })
        });
    });

    describe('findOneAndUpdate', () => {
        it('should return an object', () => {
            DatabaseDataAccess.findOneAndUpdate(Config.database.collections.test, {test: 'insertOne'}, {test: 'findOneUpdate insertOne'})
                .then(result => {
                    if (result) {
                        expect(result)
                            .to.be.a('object')
                    }
                })
                .catch((result: any) => {
                    console.log(result);
                })
        });
    });

    describe('findOneAndUpdateOrInsert', () => {
        it('should return an object', () => {
            DatabaseDataAccess.findOneAndUpdateOrInsert(Config.database.collections.test, {test: 'insertOne'}, {test: 'findOneAndUpdateOrInsert insertOne'})
                .then(result => {
                    if (result) {
                        expect(result)
                            .to.be.a('object')
                    }
                })
                .catch((result: any) => {
                    console.log(result);
                })
        });
    });

    describe('findOneAndDelete', () => {
        it('should return an object', () => {
            DatabaseDataAccess.findOneAndDelete(Config.database.collections.test, {test: 'insertMany'})
                .then(result => {
                    if (result) {
                        expect(result)
                            .to.be.a('object')
                    }
                })
                .catch((result: any) => {
                    console.log(result);
                })
        });
    });
});

