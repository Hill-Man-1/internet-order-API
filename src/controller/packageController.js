import { createPackageService, getAllPackageDescService, getAllPackageService, updatePackageService, getPackageByIdService, getAllAdminPackageService } from '../service/packageService.js';

const createPackage = async (req, res, next) => {
    try {
        const packageData = req.body;
        const createdPackage = await createPackageService(packageData);
        res.status(201).json({
            code: "0",
            info: "OK",
            data: createdPackage
        });
    } catch (err) {
        next(err);
    }
};

const getAllPackage = async (req, res, next) => {
    try {
        const packages = await getAllPackageService();
        res.status(200).json({
            code: "0",
            info: "OK",
            data: packages
        });
    } catch (err) {
        next(err);
    }
};

const getAllAdminPackage = async (req, res, next) => {
    try {
        const packages = await getAllAdminPackageService();
        res.status(200).json({
            code: "0",
            info: "OK",
            data: packages
        });
    } catch (err) {
        next(err);
    }
};

const getAllPackageDesc = async (req, res, next) => {
    try {
        const packages = await getAllPackageService();
        res.status(200).json({
            code: "0",
            info: "OK",
            data: packages
        });
    } catch (err) {
        next(err);
    }
};

const updatePackage = async (req, res, next) => {
    try {
        const packageId = parseInt(req.params.packageId);
        const packageData = req.body;
        const updatedPackage = await updatePackageService(packageId, packageData);
        res.status(200).json({
            code: "0",
            info: "OK",
            data: updatedPackage
        });
    } catch (err) {
        next(err);
    }
};

const getPackageById = async (req, res, next) => {
    try {
        const packageId = parseInt(req.params.packageId);
        const packageData = await getPackageByIdService(packageId);
        res.status(200).json({
            code: "0",
            info: "OK",
            data: packageData
        });
    } catch (err) {
        next(err);
    }
};

export { createPackage, getAllPackage, getAllAdminPackage, getAllPackageDesc, updatePackage, getPackageById };
