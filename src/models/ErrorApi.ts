export class ErrorApi extends Error {
    public status: number;
    public message: string;
    public data: any;

    constructor(status: number, message: string, data?: any) {
        super(message);
        this.status = status;
        this.message = message;
        this.data = data;
    }

    getAll() {
        return {
            status: this.status,
            message: this.message,
            data: this.data
        };
    }
}
