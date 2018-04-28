import {Translation} from "../translations";
import {Config} from "../config";
import {Request, Response, NextFunction} from "express";

export const ErrorController = {
    error404: (req: Request, res: Response, next: NextFunction) => {
        const err = new Error(Translation[Config.language].PAGE_NOT_FOUND);
        return res.status(404).json(err.message);
    },

    errorHandler: (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (process.env.ENV === 'dev') return res.json([err.message, err.stack]);
        return res.status(500).json(err.message);
    }
};
