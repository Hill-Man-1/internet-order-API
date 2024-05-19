import { orderValidation } from '../validation/orderValidation.js';
import { createOrderDao } from '../dao/orderDao.js';
import { ErrorHandler } from '../middleware/errorHandler.js';

const createOrderService = async (userData, userId) => {
    const { value, error } = orderValidation.validate(userData);
    if (error) {
        throw new ErrorHandler(400, "1", error.details[0].message);
    }

    const orderData = {
        nama: value.nama,
        email: value.email,
        upload_identity: value.upload_identity,
        kota: value.kota,
        kecamatan: value.kecamatan,
        jalan: value.jalan,
        package_id: value.package_id,
        user_id: userId,
        status_id: 2,
    };

    const order = await createOrderDao(orderData);
    return order;
};

export { createOrderService };