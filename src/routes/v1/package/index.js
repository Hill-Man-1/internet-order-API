import { createPackage, getAllPackage } from '../../../controller/packageController.js';
import express from 'express';
import authenticationMiddleware from '../../../middleware/auth.js';
import {authorizationAdmin, authorizationCustomer, authorizationTeknisi, authorizationAdminOrCustomer} from '../../../middleware/authorize.js'

const packageRouter = express.Router();

packageRouter.post('/create', authenticationMiddleware, authorizationAdmin, createPackage)
packageRouter.get('/list', authenticationMiddleware, authorizationAdminOrCustomer, getAllPackage)


export default packageRouter