import jwt from 'jsonwebtoken';
import JWT_KEY from '../config/jwt/jwt.js';

const generateToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        role: user.role
    };
    return jwt.sign(payload, JWT_KEY, { expiresIn: '1h' });
};

export default generateToken