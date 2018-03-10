import {UserServices} from '../services';
import {ErrorController} from './';
import * as express from "express";

export const UserController = {
    createUser: function (req: express.Request, res: express.Response, next: express.NextFunction) {
        return UserServices.insertOne(req.body).then(result => {
            res.json(result);
        }, e => {
            return ErrorController.errorHandler(e, req, res);
        });
    },
    getUsers: function (req: express.Request, res: express.Response, next: express.NextFunction) {
        return UserServices.findAll().then(result => {
            res.json(result);
        }, () => {
            return ErrorController.error500(req, res, next);
        });
    },
    getUser: function (req: express.Request, res: express.Response, next: express.NextFunction) {
        return UserServices.findOneByUsername(req.params.username).then(result => {
            res.json(result);
        }, () => {
            return ErrorController.error500(req, res, next);
        });
    },
    updateUser: function (req: express.Request, res: express.Response, next: express.NextFunction) {
        return UserServices.findOneAndUpdateByUsername(req.params.username, req.body).then(result => {
            res.json(result);
        }, () => {
            return ErrorController.error500(req, res, next);
        });
    },
    deleteUser: function (req: express.Request, res: express.Response, next: express.NextFunction) {
        return UserServices.findOneAndDeleteByUsername(req.params.username).then(result => {
            res.json(result);
        }, () => {
            return ErrorController.error500(req, res, next);
        });
    }
};
