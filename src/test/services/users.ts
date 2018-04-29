import {expect} from 'chai';
import {UserServices} from "../../services";
import {DbClient, User} from "../../models";
import {Config} from "../../config";

let userTestUser = {
    username: 'userTestUser',
    password: 'userTestUser',
    passwordConfirmation: 'userTestUser',
    role: 3
};

describe('users', () => {

    describe('addUser', () => {
        let result: User;
        before(done => {
            UserServices.addUser(userTestUser)
                .then(res => {
                    result = res;
                    done();
                });
        });

        it('should return an object', () => {
            expect(result).to.be.a('object');
        });
        it('contains id to be an object not null nor empty', () => {
            expect(result.id)
                .to.be.a('object')
                .to.not.be.null
                .to.not.be.empty;
        });
        it('contains username to be a string not null nor empty', () => {
            expect(result.username)
                .to.be.a('string')
                .to.not.be.null
                .to.not.be.empty;
        });
        it('contains email to be a string not null', () => {
            expect(result.email)
                .to.be.a('string')
                .to.not.be.null;
        });
        it('contains language to be a number not null', () => {
            expect(result.language)
                .to.be.a('number')
                .to.not.be.null;
        });
        it('contains role to be a number not null', () => {
            expect(result.role)
                .to.be.a('number')
                .to.not.be.null;
        });
    });

    describe('getUsers', () => {
        let result: any;
        before((done) => {
            UserServices.getUsers()
                .then(res => {
                    result = res;
                    done();
                });
        });

        it('should return an array', () => {
            expect(result).to.be.a('array');
        });
    });

    describe('isTokenValid', () => {
        let token: any,
            result: any;
        before((done) => {
            UserServices.getUser(userTestUser.username)
                .then(userResult => {
                    UserServices.getToken(userTestUser.username)
                        .then(tokenResult => {
                            token = tokenResult;
                            UserServices.isTokenValid(userResult.username, token.hash)
                                .then(res => {
                                    result = res;
                                    done();
                                })
                                .catch(err => {
                                    result = err;
                                    done();
                                });
                        })
                        .catch(err => {
                            result = err;
                            done();
                        });
                })
                .catch(err => {
                    result = err;
                    done();
                });
        });

        it('should return true', () => {
            expect(result)
                .to.be.a('boolean')
                .to.be.true;
        });
    });

    describe('getUser', () => {
        let result: any;
        before((done) => {
            UserServices.getUser(userTestUser.username)
                .then(res => {
                    result = res;
                    done();
                });
        });

        it('should return an object', () => {
            expect(result).to.be.a('object');
        });
    });

    describe('setPassword', () => {
        let result: any;
        before((done) => {
            UserServices.setPassword(userTestUser.username, 'newPassword')
                .then(res => {
                    result = res;
                    done();
                });
        });

        it('should return an object', () => {
            expect(result).to.be.a('object');
        });
        it('contains ok to be a number equal to 1', () => {
            expect(result.ok)
                .to.be.a('number')
                .to.be.equal(1);
        });
    });

    describe('getPassword', () => {
        let result: any;
        before((done) => {
            UserServices.getPassword(userTestUser.username)
                .then(res => {
                    result = res;
                    done();
                });
        });

        it('should return an object', () => {
            expect(result).to.be.a('object');
        });
        it('contains userId to be an object not null nor empty', () => {
            expect(result.userId)
                .to.be.a('object')
                .to.not.be.null
                .to.not.be.empty;
        });
        it('contains iterations to be a number not null', () => {
            expect(result.iterations)
                .to.be.a('number')
                .to.not.be.null;
        });
        it('contains salt to be a string not null nor empty', () => {
            expect(result.salt)
                .to.be.a('string')
                .to.not.be.null
                .to.not.be.empty;
        });
        it('contains hash to be a string not null nor empty', () => {
            expect(result.hash)
                .to.be.a('string')
                .to.not.be.null
                .to.not.be.empty;
        });
    });

    describe('setToken', () => {
        let result: any;
        before((done) => {
            UserServices.setToken(userTestUser.username)
                .then(res => {
                    result = res;
                    done();
                });
        });

        it('should return an object', () => {
            expect(result).to.be.a('object');
        });
        it('contains ok to be a number equal to 1', () => {
            expect(result.ok)
                .to.be.a('number')
                .to.be.equal(1);
        });
    });

    describe('getToken', () => {
        let result: any;
        before((done) => {
            UserServices.getToken(userTestUser.username)
                .then(res => {
                    result = res;
                    done();
                });
        });

        it('should return an object', () => {
            expect(result).to.be.a('object');
        });
        it('contains userId to be an object not null nor empty', () => {
            expect(result.userId)
                .to.be.a('object')
                .to.not.be.null
                .to.not.be.empty;
        });
        it('contains creation to be a string not null nor empty', () => {
            expect(result.creation)
                .to.be.a('string')
                .to.not.be.null
                .to.not.be.empty;
        });
        it('contains expiration to be a string not null nor empty', () => {
            expect(result.expiration)
                .to.be.a('string')
                .to.not.be.null
                .to.not.be.empty;
        });
        it('contains hash to be a string not null nor empty', () => {
            expect(result.hash)
                .to.be.a('string')
                .to.not.be.null
                .to.not.be.empty;
        });
    });

    describe('deleteUser', () => {
        let userId: any,
            result: any,
            checkUser: any,
            checkPassword: any,
            checkToken: any;
        before((done) => {
            UserServices.getUser(userTestUser.username)
                .then(user => {
                    userId = user.id;
                    done();
                })
                .catch(err => {
                    console.log(err);
                    done();
                });
        });
        before((done) => {
            UserServices.deleteUser(userTestUser.username)
                .then(res => {
                    result = res;
                    done();
                })
                .catch(err => {
                    done();
                });
        });
        before((done) => {
            UserServices.getUser(userTestUser.username)
                .then(user => {
                    checkUser = user;
                    done();
                })
                .catch(err => {
                    checkUser = err;
                    done();
                });
        });
        before((done) => {
            DbClient.findOne(Config.database.collections.passwords, {userId: userId})
                .then(password => {
                    checkPassword = password;
                    done();
                })
                .catch(err => {
                    checkPassword = err;
                    done();
                });
        });
        before((done) => {
            DbClient.findOne(Config.database.collections.tokens, {userId: userId})
                .then(token => {
                    checkToken = token;
                    done();
                })
                .catch(err => {
                    checkToken = err;
                    done();
                });
        });

        it('should return undefined', () => {
            expect(result).to.be.undefined;
        });
        it('check user should return an error', () => {
            expect(checkUser.message)
                .to.be.a('string')
                .to.be.equal('user not found');
        });
        it('check password should return an error', () => {
            expect(checkPassword).to.be.null;

        });
        it('check token should return an error', () => {
            expect(checkToken).to.be.null;

        });
    });
});
