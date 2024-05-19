import { getTeknisiDao, getTeknisiDescDao, getTeknisiByIdDao } from '../dao/teknisiDao.js';
import { ErrorHandler } from '../middleware/errorHandler.js';


const getAllTeknisiService = async () => {
    return await getTeknisiDao();
};

const getTeknisiDescService = async () => {
    return await getTeknisiDescDao();
};

const getTeknisiByIdService = async (id) => {
    const teknisi = await getTeknisiByIdDao(id);
    if (!teknisi) {
        throw new ErrorHandler(404, "1", "Teknisi not found");
    }
    return teknisi;
};

export {getAllTeknisiService, getTeknisiDescService, getTeknisiByIdService}

