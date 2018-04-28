import {UserServices} from '../services';
import {ErrorController} from './';
import * as express from "express";

export const UserController = {

    getUsers: (req: express.Request, res: express.Response) => {
        return UserServices.getUsers()
            .then(result => {
                return res.json(result)
            }, (e: Error) => {
                return ErrorController.errorHandler(e, req, res);
            });
    },

    createUser: (req: express.Request, res: express.Response) => {
        return UserServices.addUser(req.body.data)
            .then(result => {
                return res.json(result)
            }, (e: Error) => {
                return ErrorController.errorHandler(e, req, res);
            });
    },

    updateUser: (req: express.Request, res: express.Response) => {
        return UserServices.updateUser(req.body.user.username, req.body.data)
            .then(result => {
                return res.json(result)
            }, (e: Error) => {
                return ErrorController.errorHandler(e, req, res);
            });
    },

    getUser: (req: express.Request, res: express.Response) => {
        return UserServices.getUser(req.body.user.username)
            .then(result => {
                return res.json(result)
            }, (e: Error) => {
                return ErrorController.errorHandler(e, req, res);
            });
    },

    deleteUser: (req: express.Request, res: express.Response) => {
        return UserServices.deleteUser(req.body.user.username)
            .then(result => {
                return res.json(result)
            }, (e: Error) => {
                return ErrorController.errorHandler(e, req, res);
            });
    },
};
