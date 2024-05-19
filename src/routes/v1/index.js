import express from 'express';
import authRoute from './auth/index.js';
import teknisiRoute from './teknisi/index.js'
import limitMiddleware from '../../middleware/rateLimiter.js';
import packageRouter from './package/index.js';


const v1Router = express.Router()

v1Router.use('/auth', authRoute);
v1Router.use('/teknisi', teknisiRoute);
v1Router.use('/package', packageRouter);


export default v1Router