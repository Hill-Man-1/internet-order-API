import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '../config/db/db.js';
import JWT_KEY from '../config/jwt/jwt.js';
import { ErrorHandler } from '../middleware/errorHandler.js';
import { loginValidation } from '../validation/userValidation.js';

const login = async (req, res, next) => {
    const { username, password } = req.body;

    const { error } = loginValidation.validate({ username, password });
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { username },
            include: { Teknisi: true }
        });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const payload = {
            userId: user.id,
            username: user.username,
            role: user.role,
            teknisiId: user.Teknisi ? user.Teknisi.id : null
        };

        const token = jwt.sign(payload, JWT_KEY, { expiresIn: '1h' });

        res.cookie('access_token', token, { httpOnly: true });
        res.status(200).json({ code: "0", info: "OK", data: { id: user.id, username: user.username, role: user.role, teknisiId: user.Teknisi ? user.Teknisi.id : null } });
    } catch (error) { 
        return next(new ErrorHandler(500, "1", "Internal Server Error"));
    }
};

export { login };
