class responseError extends Error {
    constructor(status, success, message) {
        super(message);
        this.success = success;
        this.status = status;
    }
}

export { responseError }