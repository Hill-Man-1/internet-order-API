import { orderValidation } from '../validation/orderValidation.js';
import { createOrderDao, getAllOrderDao, updateOrderDao } from '../dao/orderDao.js';
import { ErrorHandler } from '../middleware/errorHandler.js';

const createOrderService = async (userData, userId) => {
    const { value, error } = orderValidation.validate(userData);
    if (error) {
        throw new ErrorHandler(400, "1", error.details[0].message);
    }

    const orderData = {
        nama: value.nama,
        email: value.email,
        upload_identity: value.upload_identity,
        kota: value.kota,
        kecamatan: value.kecamatan,
        jalan: value.jalan,
        package_id: value.package_id,
        user_id: userId,
        status_id: 2,
    };

    const order = await createOrderDao(orderData);
    return order;
};

const getAllOrderService = async () => {
    try {
        const orders = await getAllOrderDao();
        return orders;
    } catch (error) {
        throw new ErrorHandler(500, "1", "Failed to fetch orders");
    }
};

const updateOrderService = async (orderId, updateData) => {
    try {
        const updatedOrder = await updateOrderDao(orderId, updateData);
        return updatedOrder;
    } catch (error) {
        throw new ErrorHandler(500, "1", "Failed to update order");
    }
};

export { createOrderService, getAllOrderService, updateOrderService };