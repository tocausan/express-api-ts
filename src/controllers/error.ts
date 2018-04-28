import {Translation} from "../translations";
import * as express from "express";
import {Config} from "../config";

export const ErrorController = {

    error401_invalid: (req: express.Request, res: express.Response) => {
        const err = new Error(Translation[Config.language].INVALID_CREDENTIALS);
        return res.status(401).json(err.message);
    },

    error401_empty: (req: express.Request, res: express.Response) => {
        const err = new Error(Translation[Config.language].EMPTY_CREDENTIALS);
        return res.status(401).json(err.message);
    },

    error403: (req: express.Request, res: express.Response) => {
        const err = new Error(Translation[Config.language].UNAUTHORIZED_ACCESS);
        return res.status(403).json(err.message);
    },

    error404: (req: express.Request, res: express.Response) => {
        const err = new Error(Translation[Config.language].PAGE_NOT_FOUND);
        return res.status(404).json(err.message);
    },

    error500: (req: express.Request, res: express.Response) => {
        const err = new Error(Translation[Config.language].ERROR_SERVER);
        return res.status(500).json(err.message);
    },

    errorHandler: (err: Error, req: express.Request, res: express.Response) => {
        return res.status(500).json(err.message);
    }
};
