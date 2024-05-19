import { createPackageDao } from '../dao/packageDao.js';
import { packageValidation } from '../validation/packageValidation.js';
import { ErrorHandler } from '../middleware/errorHandler.js';

const createPackageService = async (packageData) => {
    const { value, error } = packageValidation.validate(packageData);
    if (error) {
        throw new ErrorHandler(400, "1", error.details[0].message);
    }

    value.harga = value.harga.toString();

    const createdPackage = await createPackageDao(value);
    return createdPackage;
};

export { createPackageService };