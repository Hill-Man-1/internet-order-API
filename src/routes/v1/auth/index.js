import express from 'express';
import { registerUser, loginUser, logoutUser, createTeknisi } from '../../../controller/userController.js';
import limitMiddleware from '../../../middleware/rateLimiter.js';
import authenticationMiddleware from '../../../middleware/auth.js';
import {authorizationAdmin, authorizationCustomer, authorizationTeknisi} from '../../../middleware/authorize.js'


const authRoute = express.Router();


authRoute.post('/register', registerUser)
authRoute.post('/login', limitMiddleware ,loginUser)
authRoute.post('/logout',authenticationMiddleware, logoutUser)
authRoute.post('/teknisi',authenticationMiddleware, authorizationTeknisi, createTeknisi)

export default authRoute