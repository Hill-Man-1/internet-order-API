import express from 'express';
import { registerUser, logoutUser, createTeknisi } from '../../../controller/userController.js';
import { login } from '../../../controller/authController.js';
import limitMiddleware from '../../../middleware/rateLimiter.js';
import authenticationMiddleware from '../../../middleware/auth.js';
import {authorizationAdmin, authorizationCustomer, authorizationTeknisi} from '../../../middleware/authorize.js'


const authRoute = express.Router();


authRoute.post('/register', registerUser)
authRoute.post('/login', limitMiddleware, login)
authRoute.post('/logout',authenticationMiddleware, logoutUser)
authRoute.post('/teknisi',authenticationMiddleware, authorizationTeknisi, createTeknisi)

export default authRoute