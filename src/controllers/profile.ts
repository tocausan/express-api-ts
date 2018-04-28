import * as express from "express";
import {UserServices} from '../services';
import {ErrorController} from './';

export const ProfileController = {

    getProfile: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log(3232)
        console.log(req.body)
        return UserServices.findOneByUsername(req.body.token.username)
            .then(result => {
                res.json(result);
            }, () => {
                return ErrorController.error500(req, res);
            });
    },

    updateProfile: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log(32322222232)
        return UserServices.findOneAndUpdateByUsername(req.body.token.username, req.body.data)
            .then(result => {
                res.json(result);
            }, () => {
                return ErrorController.error500(req, res);
            });
    },

    deleteProfile: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log(111)
        return UserServices.findOneAndDeleteByUsername(req.body.token.username)
            .then(result => {
                res.json(result);
            }, () => {
                return ErrorController.error500(req, res);
            });
    }
};
