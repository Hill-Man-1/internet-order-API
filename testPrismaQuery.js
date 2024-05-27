import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const testDatabaseConnection = async () => {
    try {
        await prisma.$connect();
        console.log("Connected to the database successfully");

        const packages = await prisma.package.findMany({
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

        console.log("Query Result:", packages);
    } catch (error) {
        console.error("Error executing query:", error);
    } finally {
        await prisma.$disconnect();
    }
};

testDatabaseConnection();
