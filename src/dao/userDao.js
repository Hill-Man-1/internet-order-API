import { prisma } from '../config/db/db.js';
import { ErrorHandler } from '../middleware/errorHandler.js';

const registerUserDao = async (user) => {
    return await prisma.user.create({
        data: user,
        select: {
            id: true,
            username: true, 
        }
    });
};

const checkUsernameDao = async (username) => {
    return await prisma.user.count({
        where: {
            username: username
        }
    });
};

const createTeknisiDao = async (teknisiData) => {
    return await prisma.teknisi.create({
        data: teknisiData,
        select: {
            id: true,
            nama: true,
            nip: true,
            no_telp: true,
            total_handling: true,
            user_id: true
        }
    });
};

const checkTeknisiByUserIdDao = async (userId) => {
    if (!userId) {
        throw new ErrorHandler(400, "1", "User ID is required");
    }

    return await prisma.teknisi.findUnique({
        where: { user_id: userId },
    });
};

export { registerUserDao, checkUsernameDao, createTeknisiDao, checkTeknisiByUserIdDao  };