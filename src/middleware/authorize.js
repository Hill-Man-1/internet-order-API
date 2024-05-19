import jwt from 'jsonwebtoken';
import JWT_KEY from '../config/jwt/jwt.js';
import { ErrorHandler } from '../middleware/errorHandler.js';

const authorizationAdmin = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        throw new ErrorHandler(401, "1", "Unauthorize")
        return next(error);
    } 

    try {
        const decodedToken = jwt.verify(token, JWT_KEY);
        if (decodedToken.role !== 'ADMIN') {
            throw new ErrorHandler(401, "1", "Authentication required")
            return next(error);
        }
        next();
    } catch (error) {
        const customError = new ErrorHandler(400, false, error.message);
        next(customError);
    }
};

const authorizationCustomer = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        throw new ErrorHandler(401, "1", "Unauthorize")
        return next(error);
    }

    try {
        const decodedToken = jwt.verify(token, JWT_KEY);
        if (decodedToken.role !== 'CUSTOMER') {
            throw new ErrorHandler(401, "1", "Authentication required")
            return next(error);
        }
        next();
    } catch (error) {
        const customError = new ErrorHandler(400, false, error.message);
        next(customError);
    }
};

const authorizationTeknisi = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        throw new ErrorHandler(401, "1", "Unauthorize")
        return next(error);
    }

    try {
        const decodedToken = jwt.verify(token, JWT_KEY);
        if (decodedToken.role !== 'TEKNISI') {
            throw new ErrorHandler(401, "1", "Authentication required")
            return next(error);
        }
        next();
    } catch (error) { 
        const customError = new ErrorHandler(400, false, error.message);
        next(customError);
    }
};

export { authorizationAdmin, authorizationCustomer, authorizationTeknisi };
