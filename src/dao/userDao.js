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

const updateTotalHandlingDao = async (teknisiId) => {
    const totalHandling = await prisma.order.count({
        where: {
            teknisi_id: teknisiId
        }
    });

    return await prisma.teknisi.update({
        where: { id: teknisiId },
        data: { total_handling: totalHandling },
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
    return await prisma.teknisi.findUnique({
        where: { user_id: userId },
    });
};

export { registerUserDao, checkUsernameDao, loginDao, createTeknisiDao, updateTotalHandlingDao, checkTeknisiByUserIdDao  };