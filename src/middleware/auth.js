import jwt from 'jsonwebtoken';
import JWT_KEY from '../config/jwt/jwt.js';
import ErrorHandler from '../utils/errorHandler.js';

const authenticationMiddleware = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        const error = new ErrorHandler({
            success: false,
            message: 'Unauthorized Access..',
            status: 400
        });
        return next(error);
    } else {
        try {
            const decodedToken = jwt.verify(token, JWT_KEY);
            console.log("Decoded Token: ", decodedToken);
            req.user = decodedToken;
            next();
        } catch (error) {
            const err = new ErrorHandler({
                success: false,
                message: 'Invalid Request..!',
                status: 500
            });
            return next(err);
        }
    }
}

export default authenticationMiddleware;