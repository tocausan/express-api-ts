import {UserServices} from '../services';
import {ErrorController} from './';
import * as express from "express";
import {DebugConsole} from "../models";

export const UserController = {

    getUsers: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new DebugConsole('UserController/getUsers');
        return UserServices.findAll().then(result => {
            res.json(result);
        }, () => {
            return ErrorController.error500(req, res, next);
        });
    },

    createUser: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new DebugConsole('UserController/createUser');
        return UserServices.insertOne(req.body.data).then(result => {
            res.json(result);
        }, e => {
            return ErrorController.errorHandler(e, req, res);
        });
    },

    updateUser: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new DebugConsole('UserController/updateUser');
        return UserServices.findOneAndUpdateByUsername(req.body.user.username, req.body.data).then(result => {
            res.json(result);
        }, () => {
            return ErrorController.error500(req, res, next);
        });
    },

    getUser: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new DebugConsole('UserController/getUser');
        return UserServices.findOneByUsername(req.body.user.username).then(result => {
            res.json(result);
        }, () => {
            return ErrorController.error500(req, res, next);
        });
    },

    deleteUser: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new DebugConsole('UserController/deleteUser');
        return UserServices.findOneAndDeleteByUsername(req.body.user.username).then(result => {
            res.json(result);
        }, () => {
            return ErrorController.error500(req, res, next);
        });
    },
};
