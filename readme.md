[![Build](https://img.shields.io/badge/build-passing-green.svg?style=flat-square)](http://tocausan.github.io)
[![Build](https://img.shields.io/badge/version-0.1.0-D07183.svg?style=flat-square)](http://tocausan.github.io)

# webpack-express-typescript-swagger-api

A secured API based on Express written in Typescript, powered by Webpack and mapped with Swagger.<br>
Other features: MongoDB connection, Multi-languages, Encryption, Mocha-Chai test.

## Default config
```text
environment:        development,
database:
    path:           mongodb://127.0.0.1:27017/
    db:             meimei
    collections:
        test:       test,
        users:      users
        passwords:  passwords
        tokens:     tokens
token:
    secret:         top-secret-token
    expiration:     7
api:
    port:           3000
    version:        1
    path:           /api/1
encryption: 
    binary:         base64
    algorithm:      aes192
    hash:           sha512
    iterations:     16
language:           EN_US
```

## Default population
```text
- Public
    - username: public
    - password: public
    - role: 0
- Member
    - username: member
    - password: member
    - role: 1
- Manager
    - username: manager
    - password: manager
    - role: 2
- Admin
    - username: admin
    - password: admin
    - role: 3
```

## Routes
### API
```text
GET     /                                   redirection to /[APIVersion]/
GET     /api-docs                           swagger UI

POST    /[APIVersion]/signin                signin
POST    /[APIVersion]/login                 login

ALL     /[APIVersion]/member/*              member role validation
POST    /[APIVersion]/member/profile        get member profile
POST    /[APIVersion]/member/update         update member profile
POST    /[APIVersion]/member/delete         delete member profile

ALL     /[APIVersion]/manager/*             manager role validation

ALL     /[APIVersion]/admin/*               admin role validation
POST    /[APIVersion]/admin/users           get all users
POST    /[APIVersion]/admin/user            get an user
POST    /[APIVersion]/admin/user/create     create an user
POST    /[APIVersion]/admin/user/update     update an user
POST    /[APIVersion]/admin/user/delete     delete an user
```

## Setup
```text
git clone https://github.com/tocausan/webpack-express-typescript-swagger-api.git
cd webpack-express-typescript-swagger-api
npm install

# don't forget to start mongodb services

# test
npm test

# start
npm build
npm start

# dev
npm run dev
```
