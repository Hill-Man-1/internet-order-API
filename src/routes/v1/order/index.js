import express from 'express';
import { createOrder, getAllOrder, updateOrder, getOrderById, getOrderByCustomerId, getOrderByTeknisiId, updateOrderByCustomer } from '../../../controller/orderController.js';
import authenticationMiddleware from '../../../middleware/auth.js';
import { authorizationCustomer, authorizationAdmin, authorizationTeknisi } from '../../../middleware/authorize.js';

const orderRouter = express.Router();

orderRouter.post('/create', authenticationMiddleware, authorizationCustomer, createOrder);
orderRouter.get('/list', authenticationMiddleware, authorizationAdmin, getAllOrder)
orderRouter.get('/list/:orderId', authenticationMiddleware, authorizationAdmin, getOrderById)
orderRouter.put('/update/:orderId', authenticationMiddleware, authorizationAdmin, updateOrder)
orderRouter.get('/my-order', authenticationMiddleware, authorizationCustomer, getOrderByCustomerId)
orderRouter.get('/teknisi-order', authenticationMiddleware, authorizationTeknisi, getOrderByTeknisiId)
orderRouter.put('/update-data', authenticationMiddleware, authorizationCustomer, updateOrderByCustomer)



export default orderRouter;
