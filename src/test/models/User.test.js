let expect = require('chai').expect,
    User = require('../../models/User'),
    enums = require('../../enums/index');

describe('User', function () {

    describe('new User()', function () {
        it('should return an object with role = PUBLIC', function () {
            expect(new User())
                .to.be.a('object')
                .to.have.all.keys(['username', 'picture', 'firstname', 'lastname', 'birthday', 'address', 'language', 'role'])
                .to.have.property('role', enums.userRole.PUBLIC)

        });
    });

    describe('new User(data)', function () {
        it('should return an object', function () {
            expect(new User({
                username: 'username',
                picture: 'picture',
                firstname: 'firstname',
                lastname: 'lastname',
                birthday: 'birthday',
                address: 'address',
                language: 'language',
                role: 0
            }))
                .to.be.a('object')
                .to.have.all.keys(['username', 'picture', 'firstname', 'lastname', 'birthday', 'address', 'language', 'role'])

        });
    });

});
