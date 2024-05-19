import express from 'express';
import { createOrder } from '../../../controller/orderController.js';
import authenticationMiddleware from '../../../middleware/auth.js';
import { authorizationCustomer } from '../../../middleware/authorize.js';

const orderRouter = express.Router();

orderRouter.post('/create', authenticationMiddleware, authorizationCustomer, createOrder);

export default orderRouter;
