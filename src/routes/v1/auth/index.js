import express from 'express';
import { registerUser, loginUser, logoutUser } from '../../../controller/userController.js';
import limitMiddleware from '../../../middleware/rateLimiter.js';
import authenticationMiddleware from '../../../middleware/auth.js';


const authRoute = express.Router();


authRoute.post('/register', registerUser)
authRoute.post('/login', limitMiddleware ,loginUser)
authRoute.post('/logout',authenticationMiddleware, logoutUser)

export default authRoute