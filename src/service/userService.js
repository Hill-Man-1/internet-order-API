import bcrypt from 'bcrypt';
import { registerValidation, loginValidation } from '../validation/userValidation.js';
import { checkUsernameDao, registerUserDao, loginDao } from '../dao/userDao.js';
import { ErrorHandler } from '../middleware/errorHandler.js';
import generateToken from '../utils/generateToken.js';

const registerUserService = async (userData) => {
    const { value, error } = registerValidation.validate(userData);
    if (error) {
        throw new ErrorHandler(400, "1", error.details[0].message);
    }

    const usernameExists = await checkUsernameDao(value.username);
    if (usernameExists > 0) {
        throw new ErrorHandler(400, "1", 'Username Already Exists');
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);
    value.password = hashedPassword;

    const user = await registerUserDao(value);
    return user; 
};

const loginUserService = async (userData) => {
    const { value, error } = loginValidation.validate(userData);
    if (error) {
        throw new ErrorHandler(400, "1", error.details[0].message);
    }

    const user = await loginDao(value.username);
    if (!user) {
        console.log("User not found with username:", value.username); 
        throw new ErrorHandler(400, "1", "User not found");
    }

    if (!value.password || !user.password) {
        throw new ErrorHandler(400, "1", "Password data is missing");
    }

    const isPasswordMatch = await bcrypt.compare(value.password, user.password);
    if (!isPasswordMatch) {
        console.log("Password mismatch for user:", value.username);
        throw new ErrorHandler(400, "1", "Invalid password");
    }

    const token = generateToken(user); 
    return {user, token};
};

const logoutUserService = () => {
    return { message: "User logged out successfully" };
}

export { registerUserService, loginUserService, logoutUserService };