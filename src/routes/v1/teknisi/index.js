import express from 'express';
import authenticationMiddleware from '../../../middleware/auth.js';
import {authorizationAdmin, authorizationCustomer, authorizationTeknisi} from '../../../middleware/authorize.js'
import { getAllTeknisi, getTeknisiDesc, getTeknisiById, updateOrderStatusByTeknisi } from '../../../controller/teknisiController.js';


const teknisiRoute = express.Router();


teknisiRoute.get('/list',authenticationMiddleware ,authorizationAdmin ,getAllTeknisi)
teknisiRoute.get('/list-desc', authenticationMiddleware,authorizationAdmin ,getTeknisiDesc)
teknisiRoute.get('/list/:teknisiId',authenticationMiddleware ,authorizationAdmin ,getTeknisiById)
teknisiRoute.put('/update-status/:orderId',authenticationMiddleware ,authorizationTeknisi ,updateOrderStatusByTeknisi)

export default teknisiRoute 