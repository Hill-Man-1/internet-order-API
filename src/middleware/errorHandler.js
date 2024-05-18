class ErrorHandler extends Error {
    constructor(status, code, message) {
        super(message);
        this.status = status;
        this.code = code;
    }
}

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof ErrorHandler) {
        res.status(err.status || 500).json({
            code: err.code || "1",
            info: err.message || 'Error',
            data: {}
        });
    } else {
        console.error(err);
        res.status(500).json({
            code: "1",
            info: 'Internal Server Error',
            data: {}
        });
    }
};

export { ErrorHandler, errorHandlerMiddleware };
