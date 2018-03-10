import {ErrorController} from './';
import {AuthServices} from '../services';
import {DebugConsole, Token, User} from "../models";
import * as express from "express";

export const AuthController = {

    signin: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new DebugConsole('AuthController/signin');
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

    login: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new DebugConsole('AuthController/login');
        let credential = {
            username: req.body.username,
            password: req.body.password
        };

        if (credential.username && credential.password) {
            AuthServices.login(credential).then((result: Token) => {
                return res.json(result);
            }, () => {
                return ErrorController.error401_invalid(req, res, next);
            });
        } else {
            ErrorController.error401_empty(req, res, next);
        }
    },

    validateUser: (key: string) => {
        new DebugConsole('AuthController/validateUser');
        return new User(null);
    }
};


