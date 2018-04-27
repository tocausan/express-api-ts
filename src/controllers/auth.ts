import * as express from "express";
import {ErrorController} from './';
import {AuthServices} from '../services';
import {Token, User} from "../models";

export const AuthController = {

    signin: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        return AuthServices.signin(req.body.username, req.body.password, req.body.passwordConfirmation)
            .then((result:Token) => {
                return res.json(result);
            }, (e: Error) => ErrorController.errorHandler(e, req, res));
    },

    login: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        return AuthServices.login(req.body.username, req.body.password)
            .then((result: Token) => {
                return res.json(result);
            }, (e: Error) => ErrorController.errorHandler(e, req, res));
    },

    validateUser: (key: string) => {
        return new User(null);
    }
};


