import { createPackageService } from '../service/packageService.js';

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

export { createPackage };