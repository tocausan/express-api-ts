import {expect} from 'chai';
import {Token} from "../../models";
import * as moment from 'moment';
import {Config} from "../../config";
import {EncryptionServices} from "../../services";

describe('Token', () => {

    describe('new Token()', () => {
        const token = new Token();
        it('should return an object with [userId, creation, expiration, hash]', () => {
            expect(token)
                .to.be.a('object')
                .to.have.all.keys(['userId', 'hash', 'creation', 'expiration'])
        });
        it('userId should return an empty string', () => {
            expect(token.userId)
                .to.be.a('string')
                .to.be.equal('');
        });
        it('creation should return a string date equal to utc now', () => {
            expect(token.creation)
                .to.be.a('string')
                .to.be.equal(moment.utc().format());
        });
        it('expiration should return a string date equal to utc now plus expiration day count', () => {
            expect(token.expiration)
                .to.be.a('string')
                .to.be.equal(moment.utc().add(Config.token.expiration, 'days').format());
        });
        it('hash should return an hashed string', () => {
            expect(token.hash)
                .to.be.a('string')
                .to.be.equal(EncryptionServices.hash(token.userId + token.creation + token.expiration, Config.encryption.iterations));
        });
    });

    describe('new Token(data)', () => {
        it('should return a custom object', () => {
            const token = new Token({
                userId: 'userId',
                creation: 'creation',
                expiration: 'expiration',
                hash: 'hash'
            });
            it('should return an object with [userId, creation, expiration, hash]', () => {
                expect(token)
                    .to.be.a('object')
                    .to.have.all.keys(['userId', 'hash', 'creation', 'expiration'])
            });
            it('userId should return a string equal to "userId"', () => {
                expect(token.userId).to.be.equal('userId');
            });
            it('hash should return a string equal to "hash"', () => {
                expect(token.hash).to.be.equal('hash');
            });
            it('creation should return a string equal to "creation"', () => {
                expect(token.creation).to.be.equal('creation');
            });
            it('expiration should return a string equal to "expiration"', () => {
                expect(token.expiration).to.be.equal('expiration');
            });
        });
    });
});
