import * as _ from 'lodash';
import {Translation} from "../translations";
import * as express from "express";

export const ErrorController = {
    error401_invalid: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log('error401_invalid');
        return res.json({
            status: 401,
            message: Translation.INVALID_CREDENTIALS
        });
    },
    error401_empty: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log('error401_empty');
        return res.json({
            status: 401,
            message: Translation.EMPTY_CREDENTIALS
        });
    },
    error403: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log('error403');
        return res.json({
            status: 403,
            message: Translation.UNAUTHORIZED_ACCESS
        });
    },
    error404: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log('error404');
        return res.json({
            status: 404,
            message: Translation.PAGE_NOT_FOUND
        });
    },
    error500: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log('error500');
        return res.json({
            status: 500,
            message: Translation.ERROR_SERVER
        });
    },
    errorHandler: (err: any, req: express.Request, res: express.Response) => {
        console.log('errorHandler');
        const message = {
            status: !_.isNil(err.status) ? err.status : 500,
            error: !_.isNil(err.message) ? err.message : '',
            stack: !_.isNil(err.stack) ? err.stack : ''
        };
        return res.status(message.status).json(message);
    }
};
