import {DebugConsole} from "./index";


export class ErrorApi extends Error {
    status: number;
    message: string;
    data: any;

    constructor(status: number, message: string, data?: any) {
        new DebugConsole('ErrorApi/constructor');
        super(message);
        this.status = status;
        this.message = message;
        this.data = data;

    }

    toJson() {
        return {
            status: this.status,
            message: this.message,
            data: this.data
        };
    }
}
