import {expect} from 'chai'
import {Config} from "../config";

describe('environment', () => {
    it('should return an number', () => {
        expect(typeof Config.environment).to.equal('string');
    });
});

describe('database', () => {
    it('should return an string', () => {
        expect(Config.database.path).to.be.a('string');
        expect(Config.database.db).to.be.a('string');
        expect(Config.database.collections.test).to.be.a('string');
        expect(Config.database.collections.users).to.be.a('string');
        expect(Config.database.collections.passwords).to.be.a('string');
        expect(Config.database.collections.tokens).to.be.a('string');
    });
});

describe('token', () => {
    it('should return an string', () => {
        expect(Config.token.secret).to.be.a('string');
    });
    it('should return an number', () => {
        expect(Config.token.expiration).to.be.a('number');
    });
});

describe('api', () => {
    it('should return an string', () => {
        expect(Config.api.path).to.be.a('string');
    });
    it('should return an number', () => {
        expect(Config.api.port).to.be.a('number');
        expect(Config.api.version).to.be.a('number');
    });
});

describe('encryption', () => {
    it('should return an string', () => {
        expect(Config.encryption.binary).to.be.a('string');
        expect(Config.encryption.algorithm).to.be.a('string');
        expect(Config.encryption.hash).to.be.a('string');
    });
    it('should return an number', () => {
        expect(Config.encryption.iterations).to.be.a('number');
    });
});

describe('language', () => {
    it('should return an number', () => {
        expect(Config.language).to.be.a('number');
    });
});



