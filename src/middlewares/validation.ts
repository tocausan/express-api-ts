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
                UserServices.findOneByUsername(req.body.username)
                    .then((user: User) => {
                        if (user.hasAccessTo(role)) return ErrorController.errorHandler(new Error(Translation[Config.language].UNAUTHORIZED_ACCESS), req, res);
                        return next();
                    })
                    .catch((err: Error) => {
                        return ErrorController.errorHandler(err, req, res);
                    });
            })
            .catch((err: Error) => {
                return ErrorController.errorHandler(err, req, res);
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
