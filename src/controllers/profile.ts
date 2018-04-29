import {Request, Response, NextFunction} from "express";
import {AuthServices, UserServices} from '../services';

export const ProfileController = {

    getProfile: async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.json({
                user: await UserServices.getUser(req.body.username),
                token: await UserServices.getToken(req.body.username)
            });
        } catch (err) {
            return next(err);
        }
    },

    updateProfile: async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.json(await UserServices.updateUser(req.body.username, req.body.data));
        } catch (err) {
            return next(err);
        }
    },

    deleteProfile: async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.json(await UserServices.deleteUser(req.body.username));
        } catch (err) {
            return next(err);
        }
    }
};
