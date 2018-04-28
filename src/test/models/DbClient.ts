import 'colors';
import {expect} from 'chai';
import * as moment from 'moment';
import {Config} from "../../config";
import {DbClient} from "../../models";

describe('DbClient', () => {

    describe('isConnected', () => {
        let result: any;
        before((done) => {
            DbClient.isConnected()
                .then((res: any) => {
                    result = res;
                    done();
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        });
        it('should return a boolean and true', () => {
            expect(result).to.be.a('boolean').to.equal(true);
        });

    });

    describe('insertMany', () => {
        let result: any;
        before((done) => {
            DbClient.insertMany(Config.database.collections.test, [{test: 'insertMany', date: moment().format()}])
                .then((res: any) => {
                    result = res;
                    done();
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        });
        it('should return an array', () => {
            expect(result).to.be.a('array');
        });
    });

    describe('insertOne', () => {
        let result: any;
        before((done) => {
            DbClient.insertOne(Config.database.collections.test, {test: 'insertOne', date: moment().format()})
                .then((res: any) => {
                    result = res;
                    done();
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        });
        it('should return an object', () => {
            expect(result).to.be.a('object');
        });
    });

    describe('insertOneIfNotExist', () => {
        let result: any;
        before((done) => {
            let test = {test: 'insertOneIfNotExist', date: moment().format()};
            DbClient.insertOneIfNotExist(Config.database.collections.test, test, test)
                .then((res: any) => {
                    result = res;
                    done();
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        });
        it('should return an object', () => {
            expect(result).to.be.a('object');
        });
    });

    describe('find', () => {
        let result: any;
        before((done) => {
            DbClient.find(Config.database.collections.test)
                .then((res: any) => {
                    result = res;
                    done();
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        });
        it('should return an array', () => {
            expect(result).to.be.a('array');
        });
    });

    describe('findOne', () => {
        let result: any;
        before((done) => {
            DbClient.findOne(Config.database.collections.test, {test: 'insertOne'})
                .then((res: any) => {
                    result = res;
                    done();
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        });
        it('should return an object', () => {
            expect(result).to.be.a('object')
        });
    });

    describe('findOneAndUpdate', () => {
        let result: any;
        before((done) => {
            DbClient.findOneAndUpdate(Config.database.collections.test, {test: 'insertOne'}, {test: 'findOneUpdate insertOne'})
                .then((res: any) => {
                    result = res;
                    done();
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        });
        it('should return an object', () => {
            expect(result).to.be.a('object');
        });
    });

    describe('findOneAndUpdateOrInsert', () => {
        let result: any;
        before((done) => {
            DbClient.findOneAndUpdateOrInsert(Config.database.collections.test, {test: 'insertOne'}, {test: 'findOneAndUpdateOrInsert insertOne'})
                .then((res: any) => {
                    result = res;
                    done();
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        });
        it('should return an object', () => {
            expect(result).to.be.a('object');
        });
    });

    describe('findOneAndDelete', () => {
        let result: any;
        before((done) => {
            DbClient.findOneAndDelete(Config.database.collections.test, {test: 'insertMany'})
                .then((res: any) => {
                    result = res;
                    done();
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        });
        it('should return an object', () => {
            expect(result).to.be.a('object');
        });
    });
});