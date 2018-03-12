import {EnvironmentEnums, LanguageEnums} from "../enums";

export const Config = {
    environment: EnvironmentEnums.DEVELOPMENT,
    database: {
        path: 'mongodb://127.0.0.1:27017/',
        db: 'meimei',
        collections: {
            test: 'test',
            users: 'users',
            passwords: 'passwords',
            tokens: 'tokens'
        }
    },
    token: {
        secret: 'top-secret-token',
        expiration: 7
    },
    api: {
        port: 3000,
        version: 1,
        path: '/api/1'
    },
    encryption: {
        binary: 'base64',
        algorithm: 'aes192',
        hash: 'sha512',
        iterations: 16
    },
    language: LanguageEnums.EN_US
};

