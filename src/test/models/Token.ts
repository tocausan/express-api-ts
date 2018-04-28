import {expect} from 'chai';
import {Token} from "../../models";
import * as moment from 'moment';
import {Config} from "../../config";
import {EncryptionServices} from "../../services";

describe('Token', () => {

    describe('new Token()', () => {
        const token = new Token();
        it('should return an object with [username, creation, expiration, hash]', () => {
            expect(token)
                .to.be.a('object')
                .to.have.all.keys(['username', 'hash', 'creation', 'expiration'])
        });
        it('username should return an empty string', () => {
            expect(token.username)
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
                .to.be.equal(EncryptionServices.hash(token.username + token.creation + token.expiration, Config.encryption.iterations));
        });
    });

    describe('new Token(data)', () => {
        it('should return a custom object', () => {
            const token = new Token({
                username: 'username',
                creation: 'creation',
                expiration: 'expiration',
                hash: 'hash'
            });
            it('should return an object with [username, creation, expiration, hash]', () => {
                expect(token)
                    .to.be.a('object')
                    .to.have.all.keys(['username', 'hash', 'creation', 'expiration'])
            });
            it('username should return a string equal to "username"', () => {
                expect(token.username).to.be.equal('username');
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

    describe('isValid', () => {
        const currentToken = new Token(),
            previousToken = new Token({
                creation: moment.utc().add(-Math.abs(Config.token.expiration), 'days').format()
            }),
            futureToken = new Token({
                creation: moment.utc().add(Math.abs(Config.token.expiration) - 1, 'days').format()
            });
        it('current token should return true', () => {
            expect(currentToken.isValid()).to.be.equal(true);
        });
        it('previous token should return false', () => {
            expect(previousToken.isValid()).to.be.equal(false);
        });
        it('future token should return false', () => {
            expect(futureToken.isValid()).to.be.equal(false);
        });
    });

});
