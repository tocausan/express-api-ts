import {Request, Response, NextFunction} from "express";
import {Config} from '../config';
import {UserRoleEnums} from "../enums";
import {Translation} from "../translations";
import {UserServices} from "../services";
import {ErrorApi, Token, User} from "../models";

export const ValidationMiddleware = {

    isRole: (role: number, req: Request, res: Response, next: NextFunction) => {
        const token = new Token(req.body.token);
        UserServices.isTokenValid(token).then((user: User) => {
            if (!user || user.role < role) return res.json(new Error(Translation[Config.language].UNAUTHORIZED_ACCESS));
            return next();
        }, (e: Error) => {
            return res.json(e);
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
