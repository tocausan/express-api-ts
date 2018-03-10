import {Config} from "../config";
import {EnvironmentEnums} from "../enums";

export class DebugConsole {
    constructor(message: string) {
        if (Config.environment === EnvironmentEnums.DEVELOPMENT) console.log('\x1b[35m', '->', '\x1b[33m', message);
    }
}
