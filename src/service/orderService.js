import { orderValidation, updateCustomerOrderValidation } from '../validation/orderValidation.js';
import { createOrderDao, getAllOrderDao, updateOrderDao, getOrderByIdDao, getOrderByCustomerIdDao, getOrderByTeknisiIdDao, checkPackageExistsDao, updateOrderByCustomerDao, getOrderIdByUserIdDao } from '../dao/orderDao.js';
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
        user_id: userId
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

const getOrderByIdService = async (orderId) => {
    const order = await getOrderByIdDao(orderId);
    if (!order) {
        throw new ErrorHandler(404, "1", "Order not found");
    }
    return order;
};

const getOrderByCustomerIdService = async (userId) => {
    try {
        const orders = await getOrderByCustomerIdDao(userId);
        return orders;
    } catch (error) {
        throw new ErrorHandler(500, "1", "Failed to fetch orders");
    }
};

const getOrderByTeknisiIdService = async (teknisiId) => {
    try {
        const orders = await getOrderByTeknisiIdDao(teknisiId);
        return orders;
    } catch (error) {
        throw new ErrorHandler(500, "1", "Failed to fetch orders");
    }
};

const updateOrderByCustomerService = async (userId, updateData) => {
    const { error } = updateCustomerOrderValidation.validate(updateData);
    if (error) {
        throw new ErrorHandler(400, "1", error.details[0].message);
    }

    const orderId = await getOrderIdByUserIdDao(userId);
    const updatedOrder = await updateOrderByCustomerDao(orderId, updateData);
    return updatedOrder;
};

export { 
    createOrderService, 
    getAllOrderService, 
    updateOrderService, 
    getOrderByIdService, 
    getOrderByCustomerIdService, 
    getOrderByTeknisiIdService,
    updateOrderByCustomerService
};
