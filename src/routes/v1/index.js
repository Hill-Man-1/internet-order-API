import express from 'express';
import authRoute from './auth/index.js';
import limitMiddleware from '../../middleware/rateLimiter.js';


const v1Router = express.Router()

v1Router.use('/auth',limitMiddleware, authRoute);

export default v1Router