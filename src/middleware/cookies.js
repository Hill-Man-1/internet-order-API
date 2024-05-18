import cookieParser from "cookie-parser";

const cookieMiddleware = (app) => {
    app.use(cookieParser());
};

export default cookieMiddleware