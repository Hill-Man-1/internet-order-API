import express from 'express';
import authenticationMiddleware from '../../../middleware/auth.js';
import {authorizationAdmin, authorizationCustomer, authorizationTeknisi} from '../../../middleware/authorize.js'
import { getAllTeknisi, getTeknisiDesc, getTeknisiById } from '../../../controller/teknisiController.js';


const teknisiRoute = express.Router();


teknisiRoute.get('/list',authenticationMiddleware ,authorizationAdmin ,getAllTeknisi)
teknisiRoute.get('/list-desc', authenticationMiddleware,authorizationAdmin ,getTeknisiDesc)
teknisiRoute.get('/list/:teknisiId',authenticationMiddleware ,authorizationAdmin ,getTeknisiById)

export default teknisiRoute 