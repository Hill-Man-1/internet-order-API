import { prisma } from '../config/db/db.js';

const createPackageDao = async (packageData) => {
    return await prisma.package.create({
        data: packageData,
        select: {
            id: true,
            nama: true,
            harga: true,
            deskripsi: true
        }
    });
};

const getAllPackageDao = async () => {
    return await prisma.package.findMany({
        orderBy: {
            jumlah_penjualan: 'desc'
        },
        select: {
            id: true,
            nama: true,
            harga: true,
            deskripsi: true,
            jumlah_penjualan: true
        }
    });
};

export { createPackageDao, getAllPackageDao };