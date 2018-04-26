import {Translation} from "../translations";
import * as express from "express";
import {DebugConsole, ErrorApi} from "../models";
import {Config} from "../config";

export const ErrorController = {

    error401_invalid: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new DebugConsole('ErrorController/error401_invalid');
        const err = new ErrorApi(401, Translation[Config.language].INVALID_CREDENTIALS);
        return res.status(err.status).json(err.toJson());
    },

    error401_empty: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new DebugConsole('ErrorController/error401_empty');
        const err = new ErrorApi(401, Translation[Config.language].EMPTY_CREDENTIALS);
        return res.status(err.status).json(err.toJson());
    },

    error403: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new DebugConsole('ErrorController/error403');
        const err = new ErrorApi(403, Translation[Config.language].UNAUTHORIZED_ACCESS);
        console.log(1, err.status)
        return res.status(err.status).json(err.toJson());
    },

    error404: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new DebugConsole('ErrorController/error404');
        const err = new ErrorApi(404, Translation[Config.language].PAGE_NOT_FOUND);
        return res.status(err.status).json(err.toJson());
    },

    error500: (req: express.Request, res: express.Response, next: express.NextFunction) => {
        new DebugConsole('ErrorController/error500');
        const err = new ErrorApi(500, Translation[Config.language].ERROR_SERVER);
        return res.status(err.status).json(err.toJson());
    },

    errorHandler: (err: ErrorApi, req: express.Request, res: express.Response) => {
        new DebugConsole('ErrorController/errorHandler');
        return res.status(err.status).json(err);
    }
};
