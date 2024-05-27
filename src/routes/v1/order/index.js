import express from 'express';
import { createOrder, getAllOrders, updateOrder, getOrderById, getOrderByCustomerId, getOrderByTeknisiId, updateOrderByCustomer, downloadFile } from '../../../controller/orderController.js';
import authenticationMiddleware from '../../../middleware/auth.js';
import { authorizationCustomer, authorizationAdmin, authorizationTeknisi } from '../../../middleware/authorize.js';

const orderRouter = express.Router();

orderRouter.post('/create', authenticationMiddleware, authorizationCustomer, createOrder);
orderRouter.get('/list', authenticationMiddleware, authorizationAdmin, getAllOrders);
orderRouter.get('/list/:orderId', authenticationMiddleware, getOrderById)
orderRouter.get('/list/:orderId/download', authenticationMiddleware, downloadFile, authorizationAdmin, getOrderById)
orderRouter.put('/update/:orderId', authenticationMiddleware, authorizationAdmin, updateOrder)
orderRouter.get('/my-order/download/:orderId', authenticationMiddleware, authorizationCustomer, downloadFile);
orderRouter.get('/my-order', authenticationMiddleware, authorizationCustomer, getOrderByCustomerId)
orderRouter.get('/teknisi-order', authenticationMiddleware, authorizationTeknisi, getOrderByTeknisiId)
orderRouter.put('/update-data', authenticationMiddleware, authorizationCustomer, updateOrderByCustomer)



export default orderRouter;
