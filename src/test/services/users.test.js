let expect = require('chai').expect,
    usersServices = require('../../src/services/users'),
    User = require('../../models/User');

let testUser = {
    username: 'test',
    password: 'test',
    passwordConfirmation: 'test'
};

describe('users', function () {

    describe('insertOne', function () {
        it('should return an object', function () {
            usersServices.insertOne(testUser).then(result => {
                if (result) {
                    expect(result)
                        .to.be.a('object')
                }
            }).catch(result => {
                console.log(result);
            });
        });
    });

    describe('findAll', function () {
        it('should return an array', function () {
            usersServices.findAll().then(result => {
                if (result) {
                    expect(result)
                        .to.be.a('array')
                }
            }).catch(result => {
                console.log(result);
            });
        });
    });

    describe('findOneByUsername', function () {
        it('should return an object', function () {
            usersServices.findOneByUsername('test').then(result => {
                if (result) {
                    expect(result)
                        .to.be.a('object')
                } else {
                    expect(result)
                        .to.be.null
                }
            }).catch(result => {
                console.log(result);
            });
        });
    });

    describe('findOneAndUpdateByUsername', function () {
        it('should return an object', function () {
            usersServices.findOneAndUpdateByUsername('test', testUser).then(result => {
                if (result) {
                    expect(result)
                        .to.be.a('object')
                } else {
                    expect(result)
                        .to.be.null
                }
            }).catch(result => {
                console.log(result);
            });
        });
    });

    describe('findOneAndDeleteByUsername', function () {
        it('should return an object', function () {
            usersServices.findOneAndDeleteByUsername('test', {username: 'test'}).then(result => {
                if (result) {
                    expect(result)
                        .to.be.a('object')
                } else {
                    expect(result)
                        .to.be.null
                }

            }).catch(result => {
                console.log(result);
            });
        });
    });

});

