import express from 'express';
import { registerUser } from '../../../controller/userController.js';


const authRoute = express.Router();


authRoute.post('/register', registerUser)

export default authRoute