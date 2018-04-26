import {expect} from 'chai';
import * as moment from 'moment';
import {Config} from "../../config";
import {DbClient} from "../../models";

describe('DbClient', () => {

    describe('isConnected', () => {
        it('should return a boolean and true', () => {
            DbClient.isConnected()
                .then((result: boolean) => expect(result).to.be.a('boolean').to.equal(true))
                .catch((e: Error) => console.log(e));
        });
    });

    describe('insertMany', () => {
        it('should return an object', () => {
            DbClient.insertMany(Config.database.collections.test, [{test: 'insertMany', date: moment().format()}])
                .then((result: object) => expect(result).to.be.a('array'))
                .catch((e: Error) => console.log(e));
        });
    });

    describe('insertOne', () => {
        it('should return an object', () => {
            DbClient.insertOne(Config.database.collections.test, {test: 'insertOne', date: moment().format()})
                .then((result: object) => expect(result).to.be.a('object'))
                .catch((e: Error) => console.log(e));
        });
    });

    describe('insertOneIfNotExist', () => {
        it('should return an object', () => {
            let test = {test: 'insertOneIfNotExist', date: moment().format()};
            DbClient.insertOneIfNotExist(Config.database.collections.test, test, test)
                .then((result: object) => expect(result).to.be.a('object'))
                .catch((e: Error) => console.log(e));
        });
    });

    describe('find', () => {
        it('should return an array', () => {
            DbClient.find(Config.database.collections.test)
                .then((result: any) => expect(result).to.be.a('array'))
                .catch((e: Error) => console.log(e));
        });
    });

    describe('findOne', () => {
        it('should return an object', () => {
            DbClient.findOne(Config.database.collections.test, {test: 'insertOne'})
                .then(result => expect(result).to.be.a('object'))
                .catch((e: Error) => console.log(e));
        });
    });

    describe('findOneAndUpdate', () => {
        it('should return an object', () => {
            DbClient.findOneAndUpdate(Config.database.collections.test, {test: 'insertOne'}, {test: 'findOneUpdate insertOne'})
                .then(result => expect(result).to.be.a('object'))
                .catch((e: Error) => console.log(e));
        });
    });

    describe('findOneAndUpdateOrInsert', () => {
        it('should return an object', () => {
            DbClient.findOneAndUpdateOrInsert(Config.database.collections.test, {test: 'insertOne'}, {test: 'findOneAndUpdateOrInsert insertOne'})
                .then(result => expect(result).to.be.a('object'))
                .catch((e: Error) => console.log(e));
        });
    });

    describe('findOneAndDelete', () => {
        it('should return an object', () => {
            DbClient.findOneAndDelete(Config.database.collections.test, {test: 'insertMany'})
                .then(result => expect(result).to.be.a('object'))
                .catch((e: Error) => console.log(e));
        });
    });
});