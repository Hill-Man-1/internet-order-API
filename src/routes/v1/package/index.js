import { createPackage } from '../../../controller/packageController.js';
import express from 'express';
import authenticationMiddleware from '../../../middleware/auth.js';
import {authorizationAdmin, authorizationCustomer, authorizationTeknisi} from '../../../middleware/authorize.js'

const packageRouter = express.Router();

packageRouter.post('/create', authenticationMiddleware, authorizationAdmin, createPackage)

export default packageRouter