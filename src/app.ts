import 'colors';
import * as debug from 'debug';
import * as http from 'http';
import {Config} from './config';

import * as express from 'express';
import * as favicon from 'serve-favicon';
import * as path from 'path';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as sassMiddleware from 'node-sass-middleware';
import * as helmet from 'helmet';
import {Routes} from './routes';
import {Swagger} from "./routes/swagger";

const port = normalizePort(Config.api.port);

// create app
const App = express()
    .use(logger(process.env.ENV || 'dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(cookieParser())
    .set('port', port)
    /**
     .use(sassMiddleware({
        src: path.join(__dirname, 'public'),
        dest: path.join(__dirname, 'public'),
        indentedSyntax: true, // true = .sass and false = .scss
        sourceMap: true
    }))
     .use(express.static(path.join(__dirname, 'public')))
     .use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
     .set('views', path.join(__dirname, 'views'))
     .set('view engine', 'ejs')
     **/

    .use('/', Swagger)
    .use('/', Routes)

    // TLS security
    .use(helmet())
    .disable('x-powered-by');

// create server
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