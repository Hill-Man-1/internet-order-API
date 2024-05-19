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

export { createOrderDao };
