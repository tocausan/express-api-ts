import {Request, Response, NextFunction} from "express";
import {Config} from '../config';
import {UserRoleEnums} from "../enums";
import {Translation} from "../translations";
import {UserServices} from "../services";
import {ErrorController} from "../controllers";
import {User} from "../models";

export const ValidationMiddleware = {

    isRole: (role: number, req: Request, res: Response, next: NextFunction): void => {
        UserServices.isTokenValid(req.body.username, req.body.token)
            .then(() => {
                UserServices.getUser(req.body.username)
                    .then((user: User) => {
                        if (!user.hasAccessTo(role)) return next(new Error(Translation[Config.language].UNAUTHORIZED_ACCESS));
                        return next();
                    })
                    .catch((err: Error) => {
                        return next(err);
                    });
            })
            .catch((err: Error) => {
                return next(err);
            });
    },

    isPublic: (req: Request, res: Response, next: NextFunction) => {
        return ValidationMiddleware.isRole(UserRoleEnums.PUBLIC, req, res, next);
    },

    isMember: (req: Request, res: Response, next: NextFunction) => {
        return ValidationMiddleware.isRole(UserRoleEnums.MEMBER, req, res, next);
    },

    isManager: (req: Request, res: Response, next: NextFunction) => {
        return ValidationMiddleware.isRole(UserRoleEnums.MANAGER, req, res, next);
    },

    isAdmin: (req: Request, res: Response, next: NextFunction) => {
        return ValidationMiddleware.isRole(UserRoleEnums.ADMIN, req, res, next);
    }

};
