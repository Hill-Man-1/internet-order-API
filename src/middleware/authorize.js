import jwt from 'jsonwebtoken';
import JWT_KEY from '../config/jwt/jwt.js';
import { ErrorHandler } from '../middleware/errorHandler.js';

const authorizationAdmin = (req, res, next) => {
    if (req.user.role !== 'ADMIN') {
        return next(new ErrorHandler(403, "1", "Role Must Be ADMIN"));
    }
    next();
};

const authorizationCustomer = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        console.log("No token provided");
        return next(new ErrorHandler(401, "1", "Unauthorized Access"));
    }

    try {
        const decodedToken = jwt.verify(token, JWT_KEY);
        if (decodedToken.role !== 'CUSTOMER') {
            console.log("Role is not CUSTOMER");
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
            return next(new ErrorHandler(403, "1", "Role Must Be Teknisi"));
        }
        next();
    } catch (error) {
        return next(new ErrorHandler(500, "1", error.message));
    }
};

const authorizationAdminOrCustomer = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        console.log("No token provided");
        return next(new ErrorHandler(401, "1", "Unauthorized Access"));
    }

    try {
        const decodedToken = jwt.verify(token, JWT_KEY);
        if (decodedToken.role !== 'ADMIN' && decodedToken.role !== 'CUSTOMER') {
            console.log("Role is not ADMIN or CUSTOMER");
            return next(new ErrorHandler(403, "1", "Role Must Be ADMIN or CUSTOMER"));
        }
        next();
    } catch (error) {
        return next(new ErrorHandler(500, "1", error.message));
    }
};

export { authorizationAdmin, authorizationCustomer, authorizationTeknisi, authorizationAdminOrCustomer };
