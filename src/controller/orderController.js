import { ErrorHandler } from '../middleware/errorHandler.js';
import { createOrderService, getAllOrderService, updateOrderService, getOrderByIdService, getOrderByCustomerIdService, getOrderByTeknisiIdService, updateOrderByCustomerService } from '../service/orderService.js';
import { updateOrderValidation, updateCustomerOrderValidation } from '../validation/orderValidation.js';
import { upload } from '../middleware/fileUpload.js';
import path from 'path';

const createOrder = async (req, res, next) => {
    upload(req, res, async function (err) {
        if (err) {
            return next(err);
        }
        
        try {
            const userId = req.user.id;
            const orderData = {
                ...req.body,
                upload_identity: req.file.path
            };

            const order = await createOrderService(orderData, userId);
            res.status(201).json({
                code: "0",
                info: "OK",
                data: order,
            });
        } catch (err) {
            next(err);
        }
    });
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

    if (reject_reason !== undefined) {
        updateData.reject_reason = reject_reason;
        updateData.status_id = 4;
    } else if (status_id !== undefined) {
        updateData.status_id = parseInt(status_id);
    }

    if (teknisi_id !== undefined) {
        updateData.teknisi_id = parseInt(teknisi_id);
    }

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

const downloadFile = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const order = await getOrderByIdService(orderId);

        if (!order || !order.upload_identity) {
            return next(new ErrorHandler(404, "1", "File not found"));
        }

        const filePath = path.resolve(order.upload_identity);
        res.download(filePath);
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

const getOrderByTeknisiId = async (req, res, next) => {
    try {
        const teknisiId = req.user.id;
        const orders = await getOrderByTeknisiIdService(teknisiId);
        res.status(200).json({
            code: "0",
            info: "OK",
            data: orders
        });
    } catch (err) {
        next(err);
    }
};

const updateOrderByCustomer = async (req, res, next) => {
    upload(req, res, async function (err) {
        if (err) {
            return next(err);
        }

        const userId = req.user.id;
        const { nama, email, kota, kecamatan, jalan } = req.body;

        const updateData = {
            nama,
            email,
            upload_identity: req.file ? req.file.path : undefined,
            kota,
            kecamatan,
            jalan,
            status_id: 3
        };

        const { error } = updateCustomerOrderValidation.validate(updateData);
        if (error) {
            return next(new ErrorHandler(400, "1", error.details[0].message));
        }

        try {
            const updatedOrder = await updateOrderByCustomerService(userId, updateData);
            res.status(200).json({
                code: "0",
                info: "OK",
                data: updatedOrder,
            });
        } catch (err) {
            next(err);
        }
    });
};

export {
    createOrder, 
    getAllOrder, 
    updateOrder, 
    getOrderById, 
    getOrderByCustomerId, 
    getOrderByTeknisiId, 
    updateOrderByCustomer,
    downloadFile };
