import {Translation} from "../translations";
import * as express from "express";
import {ErrorApi} from "../models";
import {Config} from "../config";

export const ErrorController = {

    error401_invalid: (req: express.Request, res: express.Response) => {
        const err = new ErrorApi(401, Translation[Config.language].INVALID_CREDENTIALS);
        return res.status(err.status).json(err.getAll());
    },

    error401_empty: (req: express.Request, res: express.Response) => {
        const err = new ErrorApi(401, Translation[Config.language].EMPTY_CREDENTIALS);
        return res.status(err.status).json(err.getAll());
    },

    error403: (req: express.Request, res: express.Response) => {
        const err = new ErrorApi(403, Translation[Config.language].UNAUTHORIZED_ACCESS);
        return res.status(err.status).json(err.getAll());
    },

    error404: (req: express.Request, res: express.Response) => {
        const err = new ErrorApi(404, Translation[Config.language].PAGE_NOT_FOUND);
        return res.status(err.status).json(err.getAll());
    },

    error500: (req: express.Request, res: express.Response) => {
        const err = new ErrorApi(500, Translation[Config.language].ERROR_SERVER);
        return res.status(err.status).json(err.getAll());
    },

    errorHandler: (e: Error, req: express.Request, res: express.Response) => {
        const err = new ErrorApi(500, e.message);
        return res.status(500).json(err.getAll());
    }
};
