import { registerUserService,logoutUserService, createTeknisiService } from '../service/userService.js';

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

const createTeknisi = async (req, res, next) => {
    try {
        const teknisiData = req.body;
        const userId = req.user.id; 
        const userRole = req.user.role; 

        console.log("User ID:", userId);

        teknisiData.role = userRole;

        const teknisi = await createTeknisiService(teknisiData, userId);

        res.status(201).json({
            code: "0",
            info: "OK",
            data: teknisi
        });
    } catch (err) {
        next(err);
    }
}



export { registerUser, logoutUser, createTeknisi };