let expect = require('chai').expect,
    authServices = require('../../services/auth');


describe('auth', function () {

    describe('authenticateCredential', function () {
        it('should return an object', function () {
            authServices.authenticateCredential({
                username: 'admin',
                password: 'admin'
            }).then(result => {
                if (result) {
                    expect(result)
                        .to.be.a('object')
                }
            }).catch(result => {
                console.log(result);
            });
        });
    });


});

