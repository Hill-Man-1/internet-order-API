import express from 'express';
import { registerUser, loginUser } from '../../../controller/userController.js';
import limitMiddleware from '../../../middleware/rateLimiter.js';


const authRoute = express.Router();


authRoute.post('/register', registerUser)
authRoute.post('/login', limitMiddleware ,loginUser)

export default authRoute