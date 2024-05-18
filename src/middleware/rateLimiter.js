import rateLimit from 'express-rate-limit'

const limitMiddleware = rateLimit({
	windowMs: 10 * 1 * 1000,
	max: 5,
	standardHeaders: 'true', 
	legacyHeaders: false,
})

export default limitMiddleware