import { prisma } from '../config/db/db.js';

const createOrderDao = async (orderData) => {
    return await prisma.order.create({
        data: orderData,
        select: {
            id: true,
            nama: true,
            email: true,
            upload_identity: true,
            kota: true,
            kecamatan: true,
            jalan: true,
            package_id: true,
        },
    });
};

const getAllOrderDao = async () => {
    return await prisma.order.findMany({
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
            Status: {
                select: {
                    id: true,
                    name: true,
                },
            },
            teknisi_id: true,
        }
    });
};

export { createOrderDao, getAllOrderDao };
