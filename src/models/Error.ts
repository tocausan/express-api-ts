export class ErrorApi extends Error{
    status: number;
    message: string;
    data: any;
    stack: any;

    constructor(status: number, message: string, data: any, stack:any) {
        super();
        this.message = message;
        this.stack = stack;
        this.status = status;
        this.data = data;

        console.log(this)
    }
}
