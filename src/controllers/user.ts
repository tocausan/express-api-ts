import {UserServices} from '../services';
import {ErrorController} from './';
import * as express from "express";
import {DebugConsole} from "../models";

export const UserController = {

    getUsers: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new DebugConsole('UserController/getUsers');
        return UserServices.findAll().then(result => {
            return res.json(result);
        }, err => {
            console.log(444)
            return ErrorController.errorHandler(err, req, res);
        });
    },

    createUser: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new DebugConsole('UserController/createUser');
        return UserServices.insertOne(req.body.data).then(result => {
            return res.json(result);
        }, err => {
            return ErrorController.errorHandler(err, req, res);
        });
    },

    updateUser: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new DebugConsole('UserController/updateUser');
        return UserServices.findOneAndUpdateByUsername(req.body.user.username, req.body.data).then(result => {
            return res.json(result);
        }, err => {
            return ErrorController.errorHandler(err, req, res);
        });
    },

    getUser: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new DebugConsole('UserController/getUser');
        return UserServices.findOneByUsername(req.body.user.username).then(result => {
            return res.json(result);
        }, err => {
            return ErrorController.errorHandler(err, req, res);
        });
    },

    deleteUser: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new DebugConsole('UserController/deleteUser');
        return UserServices.findOneAndDeleteByUsername(req.body.user.username).then(result => {
            return res.json(result);
        }, err => {
            return ErrorController.errorHandler(err, req, res);
        });
    },
};
