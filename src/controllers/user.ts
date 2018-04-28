import {Request, Response, NextFunction} from "express";
import {UserServices} from '../services';

export const UserController = {

    getUsers: (req: Request, res: Response, next: NextFunction) => {
        return UserServices.getUsers()
            .then(result => {
                return res.json(result)
            })
            .catch((err: Error) => {
                return next(err);
            });
    },

    createUser: (req: Request, res: Response, next: NextFunction) => {
        return UserServices.addUser(req.body.data)
            .then(result => {
                return res.json(result)
            })
            .catch((err: Error) => {
                return next(err);
            });
    },

    updateUser: (req: Request, res: Response, next: NextFunction) => {
        return UserServices.updateUser(req.body.user.username, req.body.data)
            .then(result => {
                return res.json(result)
            })
            .catch((err: Error) => {
                return next(err);
            });
    },

    getUser: (req: Request, res: Response, next: NextFunction) => {
        return UserServices.getUser(req.body.user.username)
            .then(result => {
                return res.json(result)
            })
            .catch((err: Error) => {
                return next(err);
            });
    },

    deleteUser: (req: Request, res: Response, next: NextFunction) => {
        return UserServices.deleteUser(req.body.user.username)
            .then(result => {
                return res.json(result)
            })
            .catch((err: Error) => {
                return next(err);
            });
    },
};
