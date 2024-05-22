import { createPackageDao, getAllPackageDao, getAllPackageDescDao } from '../dao/packageDao.js';
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

const getAllPackageService = async () => {
    try {
        const packages = await getAllPackageDao();
        return packages;
    } catch (error) {
        throw new ErrorHandler(500, "1", "Failed to fetch packages");
    }
};

const getAllPackageDescService = async () => {
    try {
        const packages = await getAllPackageDescDao();
        return packages;
    } catch (error) {
        throw new ErrorHandler(500, "1", "Failed to fetch packages");
    }
};


export { createPackageService, getAllPackageService, getAllPackageDescService };