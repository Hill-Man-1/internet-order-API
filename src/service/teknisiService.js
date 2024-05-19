import { getTeknisiDao, getTeknisiDescDao } from '../dao/teknisiDao.js';
import { ErrorHandler } from '../middleware/errorHandler.js';


const getAllTeknisiService = async () => {
    return await getTeknisiDao();
};

const getTeknisiDescService = async () => {
    return await getTeknisiDescDao();
};

export {getAllTeknisiService, getTeknisiDescService}

