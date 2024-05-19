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
        orderBy: {
            status_id: 'desc',
        },
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
            Teknisi: {
                select: {
                    id: true,
                    nama: true,
                }
            }
        }
    });
};

const updateOrderDao = async (orderId, updateData) => {
    const existingOrder = await prisma.order.findUnique({
        where: { id: orderId },
        select: { teknisi_id: true }
    });

    const updatedOrder = await prisma.order.update({
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
                }
            }
        }
    });

    if (existingOrder.teknisi_id !== updatedOrder.teknisi_id) {
        if (existingOrder.teknisi_id) {
            const existingTeknisi = await prisma.teknisi.findUnique({
                where: { id: existingOrder.teknisi_id },
                select: { total_handling: true }
            });

            if (existingTeknisi.total_handling > 0) {
                await prisma.teknisi.update({
                    where: { id: existingOrder.teknisi_id },
                    data: {
                        total_handling: {
                            decrement: 1
                        }
                    }
                });
            }
        }
        if (updatedOrder.teknisi_id) {
            await prisma.teknisi.update({
                where: { id: updatedOrder.teknisi_id },
                data: {
                    total_handling: {
                        increment: 1
                    }
                }
            });
        }
    }

    return updatedOrder;
};

const getOrderByIdDao = async (orderId) => {
    return await prisma.order.findUnique({
        where: { id: orderId },
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
            Package: {
                select: {
                    id: true,
                    nama: true,
                    harga: true,
                    deskripsi: true,
                },
            },
            Teknisi: {
                select: {
                    id: true,
                    nama: true,
                },
            },
            User: {
                select: {
                    id: true,
                    username: true,
                },
            }
        }
    });
};

const getOrderByCustomerIdDao = async (userId) => {
    return await prisma.order.findMany({
        where: {
            user_id: userId
        },
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
            status_id: true,
            teknisi_id: true,
            Status: {
                select: {
                    id: true,
                    name: true
                }
            },
            Package: {
                select: {
                    id: true,
                    nama: true,
                    harga: true,
                    deskripsi: true
                }
            },
            Teknisi: {
                select: {
                    id: true,
                    nama: true
                }
            },
            User: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    });
};

const getOrderByTeknisiIdDao = async (teknisiId) => {
    return await prisma.order.findMany({
        where: {
            teknisi_id: teknisiId
        },
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
            status_id: true,
            teknisi_id: true,
            Status: {
                select: {
                    id: true,
                    name: true
                }
            },
            Package: {
                select: {
                    id: true,
                    nama: true,
                    harga: true,
                    deskripsi: true
                }
            },
            Teknisi: {
                select: {
                    id: true,
                    nama: true
                }
            },
            User: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    });
};

export { createOrderDao, getAllOrderDao, updateOrderDao, getOrderByIdDao, getOrderByCustomerIdDao, getOrderByTeknisiIdDao };
