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

const updateOrderStatusByTeknisiDao = async (orderId, updateData) => {
    return await prisma.order.update({
        where: { id: orderId },
        data: updateData,
        select: {
            id: true,
            nama: true,
            email: true,
            upload_identity: true,
            kota: true,
            kecamatan: true,
            jalan: true,
            reject_reason: true,
            package_id: true,
            user_id: true,
            status_id: true,
            teknisi_id: true,
            Status: {
                select: {
                    id: true,
                    name: true,
                },
            },
            Teknisi: {
                select: {
                    id: true,
                    nama: true,
                    total_handling: true
                }
            }
        }
    });
};

export { getTeknisiDao, getTeknisiDescDao, getTeknisiByIdDao, updateOrderStatusByTeknisiDao }