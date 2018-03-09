let expect = require('chai').expect,
    moment = require('moment'),
    config = require('../../config/index')
databaseDataAccess = require('../../data-access/database');


describe('database', function () {

    describe('isConnected', function () {
        it('should return a boolean and true', function () {
            databaseDataAccess.isConnected().then(result => {

                expect(result)
                    .to.be.a('boolean')
                    .to.equal(true)

            }).catch((result) => {
                console.log(result);
            })
        });
    });

    describe('insertMany', function () {
        it('should return an object', function () {
            databaseDataAccess.insertMany(config.database.collections.test, [{
                test: 'insertMany',
                date: moment().format()
            }]).then(result => {
                if (result) {
                    expect(result)
                        .to.be.a('array')
                }
            }).catch((result) => {
                console.log(result);
            })
        });
    });

    describe('insertOne', function () {
        it('should return an object', function () {
            databaseDataAccess.insertOne(config.database.collections.test, {
                test: 'insertOne',
                date: moment().format()
            }).then(result => {
                if (result) {
                    expect(result)
                        .to.be.a('object')
                }
            }).catch((result) => {
                console.log(result);
            })
        });
    });

    describe('insertOneIfNotExist', function () {
        it('should return an object', function () {
            let test = {test: 'insertOneIfNotExist', date: moment().format()};
            databaseDataAccess.insertOneIfNotExist(config.database.collections.test, test, test).then(result => {
                if (result) {
                    expect(result)
                        .to.be.a('object')
                }
            }).catch((result) => {
                console.log(result);
            })
        });
    });

    describe('find', function () {
        it('should return an array', function () {
            databaseDataAccess.find(config.database.collections.test).then(result => {
                expect(result)
                    .to.be.a('array')

            }).catch((result) => {
                console.log(result);
            })
        });
    });

    describe('findOne', function () {
        it('should return an object', function () {
            databaseDataAccess.findOne(config.database.collections.test, {test: 'insertOne'}).then(result => {
                if (result) {
                    expect(result)
                        .to.be.a('object')
                }
            }).catch((result) => {
                console.log(result);
            })
        });
    });

    describe('findOneAndUpdate', function () {
        it('should return an object', function () {
            databaseDataAccess.findOneAndUpdate(config.database.collections.test, {test: 'insertOne'}, {test: 'findOneUpdate insertOne'}).then(result => {
                if (result) {
                    expect(result)
                        .to.be.a('object')
                }
            }).catch((result) => {
                console.log(result);
            })
        });
    });

    describe('findOneAndUpdateOrInsert', function () {
        it('should return an object', function () {
            databaseDataAccess.findOneAndUpdateOrInsert(config.database.collections.test, {test: 'insertOne'}, {test: 'findOneAndUpdateOrInsert insertOne'}).then(result => {
                if (result) {
                    expect(result)
                        .to.be.a('object')
                }
            }).catch((result) => {
                console.log(result);
            })
        });
    });

    describe('findOneAndDelete', function () {
        it('should return an object', function () {
            databaseDataAccess.findOneAndDelete(config.database.collections.test, {test: 'insertMany'}).then(result => {
                if (result) {
                    expect(result)
                        .to.be.a('object')
                }
            }).catch((result) => {
                console.log(result);
            })
        });
    });


});

