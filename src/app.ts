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

export const App = express()
    .use(logger(process.env.ENV || 'dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(cookieParser())
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

