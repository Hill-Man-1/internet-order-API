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

export { createPackageDao };