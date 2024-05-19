import { getTeknisiDao } from '../dao/teknisiDao.js';
import { ErrorHandler } from '../middleware/errorHandler.js';


const getAllTeknisiService = async () => {
    return await getTeknisiDao();
};

export {getAllTeknisiService}

