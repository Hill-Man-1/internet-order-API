import { registerUserService } from '../service/userService.js';

const registerUser = async (req, res, next) => {
    try {
        const user = await registerUserService(req.body);
        res.status(200).json({
            code: "0",
            info: "OK",
            data: user
        });
    } catch (err) {
        next(err);
    }
};

export { registerUser };