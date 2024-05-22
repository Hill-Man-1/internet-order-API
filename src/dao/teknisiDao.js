import { prisma } from '../config/db/db.js';

const getTeknisiDao = async (teknisiData) => {
    return await prisma.teknisi.findMany({
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
}

const getTeknisiDescDao = async (teknisiData) => {
    return await prisma.teknisi.findMany({
        orderBy: {
            total_handling: 'desc',
        },
        select: {
            id: true,
            nama: true,
            nip: true,
            no_telp: true,
            total_handling: true,
            user_id: true
        }
    });
}

const getTeknisiByIdDao = async (id) => {
    return await prisma.teknisi.findUnique({
        where: { id: id },
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

export { getTeknisiDao, getTeknisiDescDao, getTeknisiByIdDao }