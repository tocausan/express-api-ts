import {Request, Response, NextFunction} from "express";
import {AuthServices, UserServices} from '../services';

export const UserController = {

    getUsers: async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.json(await UserServices.getUsers());
        } catch (err) {
            return next(err);
        }
    },

    createUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.json(await UserServices.addUser(req.body.data));
        } catch (err) {
            return next(err);
        }
    },

    updateUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.json(await UserServices.updateUser(req.body.user.username, req.body.data));
        } catch (err) {
            return next(err);
        }
    },

    getUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.json(await UserServices.getUser(req.body.user.username));
        } catch (err) {
            return next(err);
        }
    },

    deleteUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.json(await UserServices.deleteUser(req.body.user.username));
        } catch (err) {
            return next(err);
        }
    },
};
