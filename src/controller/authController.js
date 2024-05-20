import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '../config/db/db.js';
import JWT_KEY from '../config/jwt/jwt.js';
import { ErrorHandler } from '../middleware/errorHandler.js';

const login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { username },
            include: { Teknisi: true }
        });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return next(new ErrorHandler(401, "1", "Invalid username or password"));
        }

        const payload = {
            userId: user.id,
            role: user.role,
        };

        if (user.role === 'TEKNISI' && user.Teknisi) {
            payload.teknisiId = user.Teknisi.id;
        }

        const token = jwt.sign(payload, JWT_KEY, { expiresIn: '1h' });

        res.cookie('access_token', token, { httpOnly: true });
        res.status(200).json({ code: "0", info: "OK", data: { token } });
    } catch (error) {
        return next(new ErrorHandler(500, "1", "Internal Server Error"));
    }
};

export { login };
