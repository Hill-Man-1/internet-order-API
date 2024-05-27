import { createPackage, getAllPackage, getAllPackageDesc, updatePackage, getPackageById, getAllAdminPackage } from '../../../controller/packageController.js';
import express from 'express';
import authenticationMiddleware from '../../../middleware/auth.js';
import {authorizationAdmin, authorizationCustomer, authorizationTeknisi, authorizationAdminOrCustomer} from '../../../middleware/authorize.js'

const packageRouter = express.Router();

packageRouter.post('/create', authenticationMiddleware, authorizationAdmin, createPackage)
packageRouter.get('/list',getAllPackage)
packageRouter.get('/list-desc',authenticationMiddleware, authorizationAdmin,getAllAdminPackage)
packageRouter.get('/:packageId', authenticationMiddleware, authorizationAdmin, getPackageById)
packageRouter.put('/update/:packageId', authenticationMiddleware, authorizationAdmin, updatePackage)


export default packageRouter