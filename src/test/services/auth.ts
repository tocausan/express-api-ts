import {expect} from 'chai';
import {AuthServices, UserServices} from "../../services";

let authTestUser = {
    username: 'authTestUser',
    password: 'authTestUser',
    passwordConfirmation: 'authTestUser',
    role: 3
};

before(done => {
    UserServices.addUser(authTestUser).then(() => done());
});

describe('auth', () => {

    describe('login', () => {
        let result: any;
        before(done => {
            AuthServices.login('authTestUser', 'authTestUser')
                .then(res => {
                    result = res;
                    done();
                })
                .catch(err => {
                    console.log(err);
                    done();
                });
        });

        it('should return an object', () => {
            expect(result).to.be.a('object');
        });
    });
});

after(done => {
    UserServices.deleteUser(authTestUser.username)
        .then(() => done())
        .catch(err => {
            console.log(err);
            done();
        });
});
