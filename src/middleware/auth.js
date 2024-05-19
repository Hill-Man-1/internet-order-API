import jwt from 'jsonwebtoken';
import JWT_KEY from '../config/jwt/jwt.js';
import { ErrorHandler } from '../middleware/errorHandler.js';

const authenticationMiddleware = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(new ErrorHandler(401, "1", "Unauthorized Access.."));
    }

    try {
        const decodedToken = jwt.verify(token, JWT_KEY);
        req.user = decodedToken;
        next();
    } catch (error) {
        return next(new ErrorHandler(500, "1", "Invalid Request..!"));
    }
}

export default authenticationMiddleware;
