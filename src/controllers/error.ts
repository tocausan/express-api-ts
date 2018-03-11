import * as _ from 'lodash';
import {Translation} from "../translations";
import * as express from "express";
import {DebugConsole, ErrorApi} from "../models";
import {Config} from "../config";

export const ErrorController = {

    error401_invalid: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new DebugConsole('ErrorController/error401_invalid');
        return res.json(new ErrorApi(401, Translation[Config.language].INVALID_CREDENTIALS, null, null));
    },

    error401_empty: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new DebugConsole('ErrorController/error401_empty');
        return res.json(new ErrorApi(401, Translation[Config.language].EMPTY_CREDENTIALS, null, null));
    },

    error403: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new DebugConsole('ErrorController/error403');
        return res.json(new ErrorApi(403, Translation[Config.language].UNAUTHORIZED_ACCESS, null, null));
    },

    error404: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new DebugConsole('ErrorController/error404');
        return res.json(new ErrorApi(404, Translation[Config.language].PAGE_NOT_FOUND, null, null));
    },

    error500: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new DebugConsole('ErrorController/error500');
        return res.json(new ErrorApi(500, Translation[Config.language].ERROR_SERVER, null, null));
    },

    errorHandler: (err: ErrorApi, req: express.Request, res: express.Response) => {
        new DebugConsole('ErrorController/errorHandler');
        const message = new ErrorApi(err.status || 500, err.message, err.data, err.stack);
        return res.status(message.status).json(message);
    }
};
