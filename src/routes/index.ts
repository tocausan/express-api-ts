import * as express from 'express';
import {Config} from '../config';
import {CorsHeaderMiddleware, RequestValidationMiddleware} from '../middlewares';
import {ErrorController, AuthController, UserController} from '../controllers';

const baseUrl = Config.api.path;

export const Routes = express.Router()
    .all('/*', [CorsHeaderMiddleware.enableCORS])
    .get('/', (req: express.Request, res: express.Response) => {
        return res.redirect(baseUrl + '/');
    })

    .post(baseUrl + '/login', AuthController.login)
    .post(baseUrl + '/signin', AuthController.signin)

    .all(baseUrl + '/admin', [RequestValidationMiddleware])

    .get(baseUrl + '/admin/users', UserController.getUsers)
    .post(baseUrl + '/admin/users', UserController.createUser)
    .get(baseUrl + '/admin/user/:username', UserController.getUser)
    .put(baseUrl + '/admin/user/:username', UserController.updateUser)
    .delete(baseUrl + '/admin/user/:username', UserController.deleteUser)

    .use(ErrorController.error404)
    .use(ErrorController.errorHandler);
