import {UserServices} from '../services';
import {ErrorController} from './';
import * as express from "express";
import {DebugConsole} from "../models";

export const ProfileController = {

    getProfile: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new DebugConsole('ProfileController/getProfile');
        return UserServices.findOneByUsername(req.body.token.username).then(result => {
            res.json(result);
        }, () => {
            return ErrorController.error500(req, res, next);
        });
    },

    updateProfile: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new DebugConsole('ProfileController/updateProfile');
        return UserServices.findOneAndUpdateByUsername(req.body.token.username, req.body.data).then(result => {
            res.json(result);
        }, () => {
            return ErrorController.error500(req, res, next);
        });
    },

    deleteProfile: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new DebugConsole('ProfileController/deleteProfile');
        return UserServices.findOneAndDeleteByUsername(req.body.token.username).then(result => {
            res.json(result);
        }, () => {
            return ErrorController.error500(req, res, next);
        });
    }
};
