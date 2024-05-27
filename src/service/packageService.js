import { createPackageDao, getAllPackageDao, getAllPackageDescDao, getPackageByIdDao, updatePackageDao, getAllAdminPackageDao } from '../dao/packageDao.js';
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

const getAllAdminPackageService = async () => {
    try {
        const packages = await getAllAdminPackageDao();
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

    value.harga = value.harga.toString();

    const updatedPackage = await updatePackageDao(packageId, value);
    return updatedPackage;
};

const getPackageByIdService = async (packageId) => {
    try {
        const packageData = await getPackageByIdDao(packageId);
        return packageData;
    } catch (error) {
        throw new ErrorHandler(500, "1", "Failed to fetch package");
    }
};

export { createPackageService, getAllPackageService, getAllAdminPackageService, getAllPackageDescService, updatePackageService, getPackageByIdService };
