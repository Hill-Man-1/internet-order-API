import rateLimit from 'express-rate-limit'

const loginLimitMiddleware = rateLimit({
	windowMs: 10 * 1 * 1000,
	max: 5,
	standardHeaders: 'true', 
	legacyHeaders: false,
})

export default loginLimitMiddleware