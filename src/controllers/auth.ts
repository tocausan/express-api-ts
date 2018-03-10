import {ErrorController} from './';
import {AuthServices} from '../services';
import {User} from "../models/User";
import * as express from "express";

export const AuthController = {

    login: function (req: express.Request, res: express.Response, next: express.NextFunction) {
        let credential = {
            username: req.body.username,
            password: req.body.password
        };

        console.log(credential)

        if (credential.username && credential.password) {
            AuthServices.login(credential).then((result) => {
                console.log(result)

                return res.json(result);
            }, () => {
                return ErrorController.error401_invalid(req, res, next);
            });
        } else {
            ErrorController.error401_empty(req, res, next);
        }

    },

    signin: function (req: express.Request, res: express.Response, next: express.NextFunction) {
        let credential = {
            username: req.body.username,
            password: req.body.password,
            passwordConfirmation: req.body.passwordConfirmation
        };

        if (!credential.username || !credential.password || !credential.passwordConfirmation) return ErrorController.error401_empty(req, res, next);
        if (credential.password !== credential.passwordConfirmation) return ErrorController.error401_invalid(req, res, next);
        AuthServices.signin(credential).then((result) => {
            //if (!result) return errorRoutes.error401_invalid(req, res, next);
            return res.json(result);
        }, () => {
            return ErrorController.error401_invalid(req, res, next);
        });
    },
    validateUser: (key: string) => {
        return new User(null);
    }
};


