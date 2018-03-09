let expect = require('chai').expect,
    Token = require('../../models/Token');

describe('Token', function () {

    describe('new Token()', function () {
        it('should return an empty object', function () {
            expect(new Token())
                .to.be.a('object')
                .to.not.have.all.keys(['username', 'token', 'creation', 'expiration'])
        });
    });

    describe('new Token(data)', function () {
        it('should return an object', function () {
            expect(new Token({
                username: 'username'
            }))
                .to.be.a('object')
                .to.have.all.keys(['username', 'token', 'creation', 'expiration'])
        });
    });

});
