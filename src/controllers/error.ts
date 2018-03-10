import * as _ from 'lodash';
import {Translation} from "../translations";
import * as express from "express";
import {ErrorApi} from "../models/Error";

export const ErrorController = {

    error401_invalid: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log('error401_invalid');
        return res.json(new ErrorApi(401, Translation.INVALID_CREDENTIALS, null, null));
    },

    error401_empty: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log('error401_empty');
        return res.json(new ErrorApi(401, Translation.EMPTY_CREDENTIALS, null, null));
    },

    error403: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log('error403');
        return res.json(new ErrorApi(403, Translation.UNAUTHORIZED_ACCESS, null, null));
    },

    error404: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log('error404');
        return res.json(new ErrorApi(404, Translation.PAGE_NOT_FOUND, null, null));
    },

    error500: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log('error500');
        return res.json(new ErrorApi(500, Translation.ERROR_SERVER, null, null));
    },

    errorHandler: (err: ErrorApi, req: express.Request, res: express.Response) => {
        console.log('errorHandler');
        const message = new ErrorApi(err.status || 500, err.message, err.data, err.stack);
        return res.status(message.status).json(message);
    }
};
