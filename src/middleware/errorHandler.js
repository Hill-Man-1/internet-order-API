class ErrorHandler extends Error {
    constructor(status, code, message) {
        super(message);
        this.status = status;
        this.code = code;
    }
}

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof ErrorHandler) {
        console.log(`Handled Error: ${err.message}`);
        res.status(err.status || 500).json({
            code: err.code || "1",
            info: err.message || 'Error',
            data: {}
        });
    } else if (err.name === 'MulterError') {
        console.log(`Multer Error: ${err.message}`);
        res.status(400).json({
            code: "1",
            info: err.message,
            data: {}
        });
    } else {
        console.error(`Unhandled Error: ${err.stack || err}`);
        res.status(500).json({
            code: "1",
            info: 'Internal Server Error',
            data: {}
        });
        next(err);
    }
};

export { ErrorHandler, errorHandlerMiddleware };
