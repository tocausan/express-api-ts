import {expect} from 'chai';
import {Token} from "../../models";
import * as moment from 'moment';
import {Config} from "../../config";
import {EncryptionServices} from "../../services";

describe('Token', () => {

    describe('new Token()', () => {
        it('should return a default object', () => {
            const token = new Token();
            expect(token)
                .to.be.a('object')
                .to.have.all.keys(['username', 'hash', 'creation', 'expiration'])
            expect(token.username).to.be.equal('');
            expect(token.creation).to.be.equal(moment.utc().format());
            expect(token.expiration).to.be.equal(moment.utc().add(Config.token.expiration, 'days').format());
            expect(token.hash).to.be.equal(EncryptionServices.hash(token.username + token.creation + token.expiration, Config.encryption.iterations));
        });
    });

    describe('new Token(data)', () => {
        it('should return a custom object', () => {
            const token = new Token({
                username: 'username',
                token: 'token',
                creation: 'creation',
                expiration: 'expiration'
            });
            expect(token)
                .to.be.a('object')
                .to.have.all.keys(['username', 'hash', 'creation', 'expiration'])
            expect(token.username).to.be.equal('username');
            expect(token.hash).to.be.equal('token');
            expect(token.creation).to.be.equal('creation');
            expect(token.expiration).to.be.equal('expiration');
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
