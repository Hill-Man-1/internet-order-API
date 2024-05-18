import { registerUserService, loginUserService,logoutUserService } from '../service/userService.js';

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

const loginUser = async (req, res, next) => {
    try {
        const { user, token } = await loginUserService(req.body);
        res.cookie('access_token', token, {
            httpOnly: true
        });
        delete user.password;
        res.status(200).json({
            code: "0",
            info: "OK",
            data: user,
        });
    } catch (err) {
        next(err);
    }
}

const logoutUser = async (req, res, next) => {
    try {
        const user = req.user;

        await logoutUserService();
        
        res.clearCookie('access_token');

        res.status(200).json({
            code: "0",
            info: "OK",
            data: { 
                message: "User logged out successfully",
                user: {
                    id: user.id,
                    username: user.username
                }
            }
        });
    } catch (err) {
        next(err);
    }
}

export { registerUser, loginUser, logoutUser };