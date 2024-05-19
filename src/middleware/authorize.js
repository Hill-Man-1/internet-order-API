import jwt from 'jsonwebtoken';
import JWT_KEY from '../config/jwt/jwt.js';
import { ErrorHandler } from '../middleware/errorHandler.js';

const authorizationAdmin = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(new ErrorHandler(401, "1", "Unauthorized Access"));
    }

    try {
        const decodedToken = jwt.verify(token, JWT_KEY);
        if (decodedToken.role !== 'ADMIN') {
            return next(new ErrorHandler(403, "1", "Role Must Be ADMIN"));
        }
        next();
    } catch (error) {
        return next(new ErrorHandler(500, "1", error.message));
    }
};

const authorizationCustomer = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(new ErrorHandler(401, "1", "Unauthorized Access"));
    }

    try {
        const decodedToken = jwt.verify(token, JWT_KEY);
        if (decodedToken.role !== 'CUSTOMER') {
            return next(new ErrorHandler(403, "1", "Role Must Be CUSTOMER"));
        }
        next();
    } catch (error) {
        return next(new ErrorHandler(500, "1", error.message));
    }
};

const authorizationTeknisi = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(new ErrorHandler(401, "1", "Unauthorized Access"));
    }

    try {
        const decodedToken = jwt.verify(token, JWT_KEY);
        if (decodedToken.role !== 'TEKNISI') {
            return next(new ErrorHandler(403, "1", "Role Must Be TEKNISI"));
        }
        next();
    } catch (error) { 
        return next(new ErrorHandler(500, "1", error.message));
    }
};

export { authorizationAdmin, authorizationCustomer, authorizationTeknisi };
