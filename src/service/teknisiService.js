import { getOrderByIdDao } from '../dao/orderDao.js';
import { getTeknisiDao, getTeknisiDescDao, getTeknisiByIdDao, updateOrderStatusByTeknisiDao } from '../dao/teknisiDao.js';
import { ErrorHandler } from '../middleware/errorHandler.js';


const getAllTeknisiService = async () => {
    return await getTeknisiDao();
};

const getTeknisiDescService = async () => {
    return await getTeknisiDescDao();
};

const getTeknisiByIdService = async (id) => {
    const teknisi = await getTeknisiByIdDao(id);
    if (!teknisi) {
        throw new ErrorHandler(404, "1", "Teknisi not found");
    }
    return teknisi;
};

const updateOrderStatusByTeknisiService = async (orderId, updateData) => {
    try {
        const existingOrder = await getOrderByIdDao(orderId);

        if (existingOrder.status_id === 6 && updateData.status_id === 7) {
            const updatedOrder = await updateOrderStatusByTeknisiDao(orderId, updateData);
            return updatedOrder;
        } else {
            throw new ErrorHandler(400, "1", "Teknisi can only change status from 6 to 7");
        }
    } catch (error) {
        throw new ErrorHandler(500, "1", error.message || "Failed to update order");
    }
};

export {getAllTeknisiService, getTeknisiDescService, getTeknisiByIdService, updateOrderStatusByTeknisiService}

