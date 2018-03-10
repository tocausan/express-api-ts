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

    .post(baseUrl + '/signin', AuthController.signin)
    .post(baseUrl + '/login', AuthController.login)

    .all(baseUrl + '/admin', [RequestValidationMiddleware])

    .get(baseUrl + '/admin/users', UserController.getUsers)
    .post(baseUrl + '/admin/users', UserController.createUser)
    .put(baseUrl + '/admin/users', UserController.updateUser)
    .get(baseUrl + '/admin/user/:username', UserController.getUser)
    .delete(baseUrl + '/admin/user/:username', UserController.deleteUser)

    .use(ErrorController.error404)
    .use(ErrorController.errorHandler);
