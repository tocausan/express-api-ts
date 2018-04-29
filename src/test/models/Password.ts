import {expect} from 'chai';
import {Password} from "../../models";

describe('Password', () => {

    describe('new Password()', () => {
        it('should return an object with [userId, iterations, salt, hash]', () => {
            expect(new Password())
                .to.be.a('object')
                .to.have.all.keys(['userId', 'iterations', 'salt', 'hash']);
        });
    });

    describe('new Password()', () => {
        const password = new Password();
        it('should return an object with [userId, iterations, salt, hash]', () => {
            expect(password)
                .to.be.a('object')
                .to.have.all.keys(['userId', 'iterations', 'salt', 'hash']);
        });
        it('userId should return a string not empty', () => {
            expect(password.userId).to.be.a('string')
                .to.be.equal('');
        });
        it('iterations should return a number', () => {
            expect(password.iterations).to.be.a('number');
        });
        it('salt should return a string', () => {
            expect(password.salt).to.be.a('string');
        });
        it('hash should return a string', () => {
            expect(password.hash).to.be.a('string');
        });
    });

    describe('new Password(data)', () => {
        const password = new Password({
            userId: 'userId',
            iterations: 1,
            salt: 'salt',
            password: 'password',
            hash: 'hash'
        });
        it('should return an object with [userId, iterations, salt, hash]', () => {
            expect(password)
                .to.be.a('object')
                .to.have.all.keys(['userId', 'iterations', 'salt', 'hash']);
        });
        it('userId should return a string equal to "userId"', () => {
            expect(password.userId).to.be.a('string')
                .to.be.equal('userId');
        });
        it('iterations should return a number equal to 1', () => {
            expect(password.iterations).to.be.a('number')
                .to.be.equal(1);
        });
        it('salt should return a string equal to "salt"', () => {
            expect(password.salt).to.be.a('string')
                .to.be.equal('salt');
        });
        it('hash should return a string equal to "hash"', () => {
            expect(password.hash).to.be.a('string')
                .to.be.equal('hash');
        });
    });

    describe('new Password(data) comparePassword', () => {
        const password = new Password({
            password: 'password'
        });
        let trueResult: any,
            falseResult: any;
        before((done) => {
            password.comparePassword('password')
                .then((res: any) => {
                    trueResult = res;
                    password.comparePassword('')
                        .then((res: any) => {
                            falseResult = res;
                            done();
                        })
                        .catch((e: Error) => {
                            console.log(e);
                        });
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        });
        it('compare with right password should return a boolean equal to true', () => {
            expect(trueResult)
                .to.be.a('boolean')
                .to.be.equal(true);
        });
        it('compare with wrong password should return a boolean equal to false', () => {
            expect(falseResult)
                .to.be.a('boolean')
                .to.be.equal(false);
        });
    });
});