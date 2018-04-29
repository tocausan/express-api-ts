import * as express from 'express';
import {Config} from '../config';
import {HeaderMiddleware, ValidationMiddleware} from '../middlewares';
import {ErrorController, AuthController, UserController, ProfileController} from '../controllers';
import {PopulationServices} from "../services";

const baseUrl = Config.api.path,
    memberUrl = baseUrl + '/member',
    managerUrl = baseUrl + '/manager',
    adminUrl = baseUrl + '/admin';

if (process.env.ENV === 'dev') PopulationServices.default();

export const Routes = express.Router()

    .all('/*', [HeaderMiddleware.enableCORS])
    .get('/', (req: express.Request, res: express.Response) => {
        return res.redirect(baseUrl + '/');
    })

    // PUBLIC
    .post(baseUrl + '/signin', AuthController.signin)
    .post(baseUrl + '/login', AuthController.login)
    .post(baseUrl + '/check-token', AuthController.checkToken)

    // MEMBER
    .all(memberUrl + '/*', [ValidationMiddleware.isMember])
    .post(memberUrl + '/profile', ProfileController.getProfile)
    .post(memberUrl + '/profile/update', ProfileController.updateProfile)
    .post(memberUrl + '/profile/delete', ProfileController.deleteProfile)

    // MANAGER
    .all(managerUrl + '/*', [ValidationMiddleware.isManager])

    // ADMIN
    .all(adminUrl + '/*', [ValidationMiddleware.isAdmin])
    .post(adminUrl + '/users', UserController.getUsers)
    .post(adminUrl + '/user', UserController.getUser)
    .post(adminUrl + '/user/create', UserController.createUser)
    .post(adminUrl + '/user/update', UserController.updateUser)
    .post(adminUrl + '/user/delete', UserController.deleteUser)

    // ERROR
    .use(ErrorController.error404)
    .use(ErrorController.errorHandler);

