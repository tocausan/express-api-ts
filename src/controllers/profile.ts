import * as express from "express";
import {UserServices} from '../services';
import {ErrorController} from './';

export const ProfileController = {

    getProfile: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        return UserServices.getUser(req.body.token.username)
            .then(result => {
                res.json(result);
            }, () => {
                return ErrorController.error500(req, res);
            });
    },

    updateProfile: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        return UserServices.updateUser(req.body.token.username, req.body.data)
            .then(result => {
                res.json(result);
            }, () => {
                return ErrorController.error500(req, res);
            });
    },

    deleteProfile: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        return UserServices.deleteUser(req.body.token.username)
            .then(() => {
                res.redirect('/');
            }, () => {
                return ErrorController.error500(req, res);
            });
    }
};
