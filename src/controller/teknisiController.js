import { getAllTeknisiService, getTeknisiDescService, getTeknisiByIdService, updateOrderStatusByTeknisiService } from "../service/teknisiService.js";
import { updateTeknisiOrderValidation } from "../validation/orderValidation.js";


const getAllTeknisi = async (req, res, next) => {
    try {
        const teknisiList = await getAllTeknisiService();
        res.status(200).json({
            code: "0",
            info: "OK",
            data: teknisiList
        });
    } catch (err) {
        next(err);
    }
}

const getTeknisiDesc = async (req, res, next) => {
    try {
        const teknisiList = await getTeknisiDescService();
        res.status(200).json({
            code: "0",
            info: "OK",
            data: teknisiList
        });
    } catch (err) {
        next(err);
    }
}

const getTeknisiById = async (req, res, next) => {
    try {
        const teknisiId = parseInt(req.params.teknisiId);
        const teknisi = await getTeknisiByIdService(teknisiId);
        res.status(200).json({
            code: "0",
            info: "OK",
            data: teknisi
        });
    } catch (err) {
        next(err);
    }
}
const updateOrderStatusByTeknisi = async (req, res, next) => {
    const { orderId } = req.params;
    const { status_id } = req.body;
    const userRole = req.user.role;

    const updateData = {};
    if (status_id !== undefined) {
        updateData.status_id = parseInt(status_id);
    }

    const { error } = updateTeknisiOrderValidation.validate(updateData);
    if (error) {
        return next(new ErrorHandler(400, "1", error.details[0].message));
    }

    try {
        const updatedOrder = await updateOrderStatusByTeknisiService(parseInt(orderId), updateData);
        res.status(200).json({
            code: "0",
            info: "OK",
            data: updatedOrder,
        });
    } catch (err) {
        next(err);
    }
};

export { getAllTeknisi,getTeknisiDesc, getTeknisiById, updateOrderStatusByTeknisi}