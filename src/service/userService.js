import bcrypt from 'bcrypt';
import { registerValidation, loginValidation, teknisiValidation } from '../validation/userValidation.js';
import { checkUsernameDao, registerUserDao, createTeknisiDao, checkTeknisiByUserIdDao } from '../dao/userDao.js';
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

const logoutUserService = () => {
    return { message: "User logged out successfully" };
}

const createTeknisiService = async (teknisiData, userId) => {
    const { value, error } = teknisiValidation.validate(teknisiData);
    if (error) {
        throw new ErrorHandler(400, "1", error.details[0].message);
    }

    value.user_id = userId;

    delete value.role;

    const existingTeknisi = await checkTeknisiByUserIdDao(userId);
    if (existingTeknisi) {
        throw new ErrorHandler(400, "1", "Teknisi with this user ID already exists");
    }

    const teknisi = await createTeknisiDao(value);

    return teknisi;
};





export { registerUserService, logoutUserService, createTeknisiService };