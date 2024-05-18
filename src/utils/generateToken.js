import jwt from 'jsonwebtoken';
import JWT_KEY from '../config/jwt/jwt.js';

const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        username: user.username,
        role: user.role
    }, JWT_KEY, {
        expiresIn: '1h'
    });
}

export default generateToken;