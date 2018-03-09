export const Config = {
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
        port: '3000',
        version: 1,
        path: '/api/1'
    }
};

