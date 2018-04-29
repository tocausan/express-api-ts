import {expect} from 'chai';
import {UserServices} from "../../services";
import {User} from "../../models";

let userTestUser = {
    username: 'userTestUser',
    password: 'userTestUser',
    passwordConfirmation: 'userTestUser',
    role: '3'
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
/*
    describe('getUser', () => {
        let result: any;
        before((done) => {
            UserServices.(userTestUser.username)
                .then(res => {
                    result = res;
                    done();
                });
        });

        it('should return an object', () => {
            expect(result).to.be.a('object');
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
*/
});

after(done => {
    UserServices.deleteUser(userTestUser.username)
        .then(() => done());
});
