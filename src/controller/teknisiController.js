import { getAllTeknisiService, getTeknisiDescService, getTeknisiByIdService } from "../service/teknisiService.js";


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
        const teknisiId = parseInt(req.params.id);
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

export { getAllTeknisi,getTeknisiDesc, getTeknisiById}