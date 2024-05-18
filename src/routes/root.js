import express from 'express';

const rootRoute = express.Router();

rootRoute.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Order Internet API!"
    })
})

export default rootRoute