import { createOrderService, getAllOrderService, updateOrderService, getOrderByIdService, getOrderByCustomerIdService } from '../service/orderService.js';
import { updateOrderValidation } from '../validation/orderValidation.js';

const createOrder = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const order = await createOrderService(req.body, userId);
        res.status(201).json({
            code: "0",
            info: "OK",
            data: order,
        });
    } catch (err) {
        next(err);
    }
};

const getAllOrder = async (req, res, next) => {
    try {
        const orders = await getAllOrderService();
        res.status(200).json({
            code: "0",
            info: "OK",
            data: orders,
        });
    } catch (err) {
        next(err);
    }
};

const updateOrder = async (req, res, next) => {
    const { orderId } = req.params;
    const { status_id, teknisi_id, reject_reason } = req.body;

    const updateData = {};
    if (status_id !== undefined) updateData.status_id = parseInt(status_id);
    if (teknisi_id !== undefined) updateData.teknisi_id = parseInt(teknisi_id);
    if (reject_reason !== undefined) updateData.reject_reason = reject_reason;

    const { error } = updateOrderValidation.validate(updateData);
    if (error) {
        return next(new ErrorHandler(400, "1", error.details[0].message));
    }

    try {
        const updatedOrder = await updateOrderService(parseInt(orderId), updateData);
        res.status(200).json({
            code: "0",
            info: "OK",
            data: updatedOrder,
        });
    } catch (err) {
        next(err);
    }
};

const getOrderById = async (req, res, next) => {
    try {
        const orderId = parseInt(req.params.orderId);
        const order = await getOrderByIdService(orderId);
        res.status(200).json({
            code: "0",
            info: "OK",
            data: order
        });
    } catch (err) {
        next(err);
    }
};

const getOrderByCustomerId = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const orders = await getOrderByCustomerIdService(userId);
        res.status(200).json({
            code: "0",
            info: "OK",
            data: orders
        });
    } catch (err) {
        next(err);
    }
};

export { createOrder, getAllOrder, updateOrder, getOrderById, getOrderByCustomerId };