import * as moment from 'moment';
import * as jwt from 'jwt-simple';
import {Config} from '../config';
import {AuthController} from '../controllers';
import {UserRoleEnums} from "../enums";
import {Translation} from "../translations";
import {DebugConsole, User} from "../models";

export const RequestValidationMiddleware = (req: any, res: any, next: any) => {
    new DebugConsole('RequestValidationMiddleware');

    // We skip the token outh for [OPTIONS] requests.
    //if(req.method == 'OPTIONS') next();

    let token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'],
        key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

    if (token && key) {
        try {
            let decoded = jwt.decode(token, Config.token.secret);

            if (decoded.exp <= moment.utc()) {
                return res.status(400)
                    .json({
                        "status": 400,
                        "message": Translation.EXPIRED_TOKEN
                    });
            }

            let dbUser: User = AuthController.validateUser(key);

            if (dbUser) {
                if ((req.url.indexOf(UserRoleEnums.ADMIN) > -1 && dbUser.role == UserRoleEnums.ADMIN) ||
                    (req.url.indexOf(UserRoleEnums.ADMIN) < 0 && req.url.indexOf(Config.api.path) >= 0)) {
                    next();
                } else {
                    return res.status(403)
                        .json({
                            "status": 403,
                            "message": Translation.UNAUTHORIZED_ACCESS
                        });
                }
            } else {
                return res.status(401)
                    .json({
                        "status": 401,
                        "message": Translation.INVALID_USER
                    });
            }
        } catch (err) {
            return res.status(500)
                .json({
                    "status": 500,
                    "message": Translation.SOMETHING_WENT_WRONG,
                    "error": err
                });
        }
    } else {
        return res.status(401)
            .json({
                "status": 401,
                "message": Translation.INVALID_TOKEN_OR_KEY
            });
    }
};
