import {Request, Response, NextFunction} from "express";
import {AuthServices, UserServices} from '../services';

export const AuthController = {

    signin: async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.json(await AuthServices.signin(req.body.username, req.body.password, req.body.passwordConfirmation));
        } catch (err) {
            return next(err);
        }
    },

    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.json(await AuthServices.login(req.body.username, req.body.password));
        } catch (err) {
            return next(err);
        }
    },

    checkToken: async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.json(await UserServices.isTokenValid(req.body.username, req.body.token));
        } catch (err) {
            return next(err);
        }
    }
};
