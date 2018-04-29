let expect = require('chai').expect,
    usersServices = require('../../src/services/users'),
    User = require('../../models/User');

let testUser = {
    username: 'test',
    password: 'test',
    passwordConfirmation: 'test'
};

describe('users', () => {

    describe('insertOne', () => {
        it('should return an object', () => {
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

    describe('findAll', () => {
        it('should return an array', () => {
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

    describe('findOneByUsername', () => {
        it('should return an object', () => {
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

    describe('findOneAndUpdateByUsername', () => {
        it('should return an object', () => {
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

    describe('findOneAndDeleteByUsername', () => {
        it('should return an object', () => {
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

