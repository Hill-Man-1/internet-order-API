import { createOrderService, getAllOrderService } from '../service/orderService.js';

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

export { createOrder, getAllOrder };