import { prisma } from '../config/db/db.js';

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

const loginDao = async (username) => {
    return await prisma.user.findUnique({
        where: {
            username: username
        },
        select: {
            id: true,
            username: true,
            password: true,
            role: true
        }
    }); 
};


export { registerUserDao, checkUsernameDao, loginDao };