import express from 'express';
import loginLimitMiddleware from '../middleware/rateLimiter.js'

const rootRoute = express.Router();

rootRoute.get('/', loginLimitMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Order Internet API!"
    })
})

export default rootRoute