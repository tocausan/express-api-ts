let expect = require('chai').expect,
    Password = require('../../models/Password');

describe('Password', function () {

    describe('new Password()', function () {
        it('should return an object', function () {
            expect(new Password())
                .to.be.a('object')
                .to.have.all.keys(['iterations', 'salt', 'username', 'password', 'passwordAttempt', 'hash'])
        });
    });

    describe('new Password(data)', function () {
        it('should return an object', function () {
            expect(new Password({
                username: 'username',
                password: 'password'
            }))
                .to.be.a('object')
                .to.have.all.keys(['iterations', 'salt', 'username', 'password', 'passwordAttempt', 'hash'])
        });
    });

    describe('new Password().generateSalt()', function () {
        it('should return a string', function () {
            expect(new Password().generateSalt())
                .to.be.a('string')
        });
    });

    describe('new Password().hashPassword()', function () {
        it('should return a string', function () {
            new Password().hashPassword().then((result) => {
                expect(result)
                    .to.be.a('string')
                    .to.not.be.null
                    .to.not.be.undefined
            }).catch(err => {
                console.log(err);
            });
        });
    });

    describe('new Password().comparePassword()', function () {
        it('should return a string', function () {

            let password = new Password({
                username: 'username',
                password: 'password',
                passwordAttempt: 'password'
            });
            password.hashPassword().then(() => {
                password.comparePassword().then(result => {
                    expect(result)
                        .to.be.a('boolean')
                        .to.not.be.null
                        .to.not.be.undefined
                }).catch(err => {
                    console.log(err);
                });
            }).catch(err => {
                console.log(err);
            });
        });
    });

});