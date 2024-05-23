import { createPackageDao, getAllPackageDao, getAllPackageDescDao, updatePackageDao } from '../dao/packageDao.js';
import { packageValidation, updatePackageValidation } from '../validation/packageValidation.js';
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

const updatePackageService = async (packageId, packageData) => {
    const { value, error } = updatePackageValidation.validate(packageData);
    if (error) {
        throw new ErrorHandler(400, "1", error.details[0].message);
    }

    const updatedPackage = await updatePackageDao(packageId, value);
    return updatedPackage;
};

export { createPackageService, getAllPackageService, getAllPackageDescService, updatePackageService };