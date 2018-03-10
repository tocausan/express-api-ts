import {DebugConsole} from "../models";

export const CorsHeaderMiddleware = {
    enableCORS: (req: any, res: any, next: any) => {
        new DebugConsole('CorsHeaderMiddleware/enableCORS');

        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    }
};
