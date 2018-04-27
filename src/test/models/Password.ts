import {expect} from 'chai';
import {Password} from "../../models";

describe('Password', () => {

    describe('new Password()', () => {
        it('should return an object', () => {
            expect(new Password())
                .to.be.a('object')
                .to.have.all.keys(['iterations', 'salt', 'username', 'hash'])
        });
    });

    describe('new Password()', () => {
        it('should return an object', () => {
            const password = new Password();
            expect(password)
                .to.be.a('object')
                .to.have.all.keys(['iterations', 'salt', 'username', 'hash'])
            expect(password.iterations).to.be.a('number');
            expect(password.salt).to.be.a('string');
            expect(password.username).to.be.a('string').to.be.equal('');
            expect(password.hash).to.be.a('string');
        });
    });

    describe('new Password(data)', () => {
        it('should return an object', () => {
            const password = new Password({
                iterations: 1,
                salt: 'salt',
                username: 'username',
                password: 'password',
                hash: 'hash'
            });
            expect(password)
                .to.be.a('object')
                .to.have.all.keys(['iterations', 'salt', 'username', 'hash'])
            expect(password.iterations).to.be.a('number').to.be.equal(1);
            expect(password.salt).to.be.a('string').to.be.equal('salt');
            expect(password.username).to.be.a('string').to.be.equal('username');
            expect(password.hash).to.be.a('string').to.be.equal('hash');
        });
    });

    describe('new Password(data) comparePassword', () => {
        it('should return a boolean', () => {

            let password = new Password({
                password: 'password'
            });
            password.comparePassword('password').then(result => {
                expect(result)
                    .to.be.a('boolean')
                    .to.be.equal(true)
            }).catch(err => {
                console.log(err);
            });

            password.comparePassword('').then(result => {
                expect(result)
                    .to.be.a('boolean')
                    .to.be.equal(false)
            }).catch(err => {
                console.log(err);
            });
        });
    });

});