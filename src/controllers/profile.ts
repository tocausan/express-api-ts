import {Request, Response, NextFunction} from "express";
import {UserServices} from '../services';

export const ProfileController = {

    getProfile: async (req: Request, res: Response, next: NextFunction) => {
        const user = await UserServices.getUser(req.body.username)
            .catch((err: Error) => {
                return next(err);
            });
        const token = await UserServices.getToken(req.body.username)
            .catch((err: Error) => {
                return next(err);
            });
        return res.json({
            user: user,
            token: token
        });
    },

    updateProfile: async (req: Request, res: Response, next: NextFunction) => {
        const result = await UserServices.updateUser(req.body.token.username, req.body.data)
            .catch((err: Error) => {
                return next(err);
            });
        return res.json(result);
    },

    deleteProfile: async (req: Request, res: Response, next: NextFunction) => {
        await UserServices.deleteUser(req.body.token.username)
            .catch((err: Error) => {
                return next(err);
            });
        return res.redirect('/');
    }
};
