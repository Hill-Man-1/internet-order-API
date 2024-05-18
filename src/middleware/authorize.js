import jwt from 'jsonwebtoken';
import JWT_KEY from '../config/jwt/jwt.js';
import { errorHandler} from '../utils/errorHandler.js';

const authorizationAdmin = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        const error = new errorHandler(401, false, 'Unauthorized');
        return next(error);
    } 

    try {
        const decodedToken = jwt.verify(token, JWT_KEY);
        if (decodedToken.role !== 'admin') {
            const error = new errorHandler(401, false, 'Authentication required.');
            return next(error);
        }
        next();
    } catch (error) {
        const customError = new errorHandler(400, false, error.message);
        next(customError);
    }
};

const authorizationCustomer = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        const error = new errorHandler(401, false, 'Unauthorized');
        return next(error);
    }

    try {
        const decodedToken = jwt.verify(token, JWT_KEY);
        if (decodedToken.role !== 'customer') {
            const error = new errorHandler(401, false, 'Authentication required.');
            return next(error);
        }
        next();
    } catch (error) {
        const customError = new errorHandler(400, false, error.message);
        next(customError);
    }
};

const authorizationTeknisi = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        const error = new errorHandler(401, false, 'Unauthorized');
        return next(error);
    }

    try {
        const decodedToken = jwt.verify(token, JWT_KEY);
        if (decodedToken.role !== 'teknisi') {
            const error = new errorHandler(401, false, 'Authentication required.');
            return next(error);
        }
        next();
    } catch (error) { 
        const customError = new errorHandler(400, false, error.message);
        next(customError);
    }
};

export { authorizationAdmin, authorizationCustomer, authorizationTeknisi };
