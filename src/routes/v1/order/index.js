import express from 'express';
import { createOrder, getAllOrder } from '../../../controller/orderController.js';
import authenticationMiddleware from '../../../middleware/auth.js';
import { authorizationCustomer, authorizationAdmin } from '../../../middleware/authorize.js';

const orderRouter = express.Router();

orderRouter.post('/create', authenticationMiddleware, authorizationCustomer, createOrder);
orderRouter.get('/list', authenticationMiddleware, authorizationAdmin, getAllOrder)


export default orderRouter;
