import 'colors';
import * as debug from 'debug';
import * as http from 'http';
import * as express from 'express';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import {Config} from './config';
import {Routes} from './routes';
import {Swagger} from "./routes/swagger";

const port = normalizePort(Config.api.port);

const App = express()
    .use(logger(process.env.ENV || 'dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(cookieParser())
    .set('port', port)
    .use('/', Swagger)
    .use('/', Routes)
    .use(helmet())
    .disable('x-powered-by');

const server = http.createServer(App)
    .listen(port)
    .on('error', onError)
    .on('listening', onListening);

function normalizePort(val: any) {
    let port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
}

function onError(error: any) {
    if (error.syscall !== 'listen') throw error;
    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    let addr = server.address(),
        bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
    debug('Listening on ' + bind);
}