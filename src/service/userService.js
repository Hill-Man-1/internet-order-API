import bcrypt from 'bcrypt';
import { registerValidation } from '../validation/userValidation.js';
import { checkUsernameDao, registerUserDao } from '../dao/userDao.js';
import { ErrorHandler } from '../middleware/errorHandler.js';

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

export { registerUserService };