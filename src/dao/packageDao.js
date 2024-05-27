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
        select: {
            id: true,
            nama: true,
            harga: true,
            deskripsi: true,
            jumlah_penjualan: true
        }
    }); 
};

const getAllAdminPackageDao = async () => {
    return await prisma.package.findMany({
        orderBy: {
            jumlah_penjualan: 'desc'
        }
        ,select: {
            id: true,
            nama: true,
            harga: true,
            deskripsi: true,
            jumlah_penjualan: true
        }
    }); 
};

const getAllPackageDescDao = async () => {
    return await prisma.package.findMany({
        orderBy: {
            jumlah_penjualan: 'desc'
        }
        ,select: {
            id: true,
            nama: true,
            harga: true,
            deskripsi: true,
            jumlah_penjualan: true
        }
    }); 
};

const updatePackageDao = async (packageId, packageData) => {
    return await prisma.package.update({
        where: { id: packageId },
        data: packageData,
        select: {
            id: true,
            nama: true,
            harga: true,
            deskripsi: true
        }
    });
};

const getPackageByIdDao = async (packageId) => {
    return await prisma.package.findUnique({
        where: { id: packageId },
        select: {
            id: true,
            nama: true,
            harga: true,
            deskripsi: true
        }
    });
};

export { createPackageDao, getAllPackageDao, getAllPackageDescDao, getPackageByIdDao, updatePackageDao, getAllAdminPackageDao };
