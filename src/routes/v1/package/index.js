import { createPackage, getAllPackage, getAllPackageDesc } from '../../../controller/packageController.js';
import express from 'express';
import authenticationMiddleware from '../../../middleware/auth.js';
import {authorizationAdmin, authorizationCustomer, authorizationTeknisi, authorizationAdminOrCustomer} from '../../../middleware/authorize.js'

const packageRouter = express.Router();

packageRouter.post('/create', authenticationMiddleware, authorizationAdmin, createPackage)
packageRouter.get('/list', authenticationMiddleware, authorizationAdminOrCustomer, getAllPackage)
packageRouter.get('/list-desc', authenticationMiddleware, authorizationAdmin, getAllPackageDesc)


export default packageRouter